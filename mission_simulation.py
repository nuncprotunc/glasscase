#!/usr/bin/env python3
"""Monte Carlo simulation of GlassCase's mission success likelihood.

This script models three core success signals over a planning horizon:
1. Active user base exploring transparency tools.
2. Strategic partnerships (e.g., agencies, universities).
3. Major funding win (grants or large contracts).

Each simulation run samples monthly user growth, quarterly partnership wins,
and annual funding attempts. The default parameters are illustrative—tune them
to your pipeline data or revised expectations.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass
from statistics import mean
from typing import Dict, List, Tuple


@dataclass
class MissionTargets:
    """Thresholds that define a successful mission outcome."""

    active_users: int
    partnerships: int
    funding_secured: bool


@dataclass
class SimulationParams:
    """Parameters governing stochastic inputs for the simulation."""

    months: int = 36
    initial_users: int = 250
    base_user_growth: float = 0.075  # expected monthly growth rate (7.5 %)
    user_growth_std: float = 0.04
    quarterly_partnership_prob: float = 0.28
    partnership_prob_std: float = 0.12
    annual_funding_prob: float = 0.45
    funding_prob_std: float = 0.15
    funding_attempts_per_year: int = 2
    seed: int | None = 8675309


@dataclass
class SimulationResult:
    """Outcome for a single Monte Carlo run."""

    success: bool
    users: int
    partnerships: int
    funding_secured: bool


def clamp_probability(value: float) -> float:
    """Clamp a real value into the inclusive probability range [0, 1]."""

    return min(1.0, max(0.0, value))


def percentile(sorted_values: List[float], fraction: float) -> float:
    """Return empirical percentile from sorted samples."""

    if not sorted_values:
        raise ValueError("Cannot compute percentile of empty list")

    position = (len(sorted_values) - 1) * fraction
    lower_index = math.floor(position)
    upper_index = math.ceil(position)

    if lower_index == upper_index:
        return sorted_values[lower_index]

    lower_value = sorted_values[lower_index]
    upper_value = sorted_values[upper_index]
    weight = position - lower_index
    return lower_value + (upper_value - lower_value) * weight


def simulate_once(rng: random.Random, params: SimulationParams, targets: MissionTargets) -> SimulationResult:
    users = params.initial_users
    partnerships = 0
    funding_secured = False

    for month in range(1, params.months + 1):
        monthly_growth = rng.gauss(params.base_user_growth, params.user_growth_std)
        monthly_growth = max(-0.95, monthly_growth)  # prevent catastrophic negatives
        users = max(0, round(users * (1 + monthly_growth)))

        if month % 3 == 0:  # quarterly partnership opportunity
            partnership_prob = clamp_probability(
                rng.gauss(params.quarterly_partnership_prob, params.partnership_prob_std)
            )
            if rng.random() < partnership_prob:
                partnerships += 1

        if month % 12 == 0 and not funding_secured:
            funding_prob = clamp_probability(
                rng.gauss(params.annual_funding_prob, params.funding_prob_std)
            )
            for _ in range(params.funding_attempts_per_year):
                if rng.random() < funding_prob:
                    funding_secured = True
                    break

    success = (
        users >= targets.active_users
        and partnerships >= targets.partnerships
        and (not targets.funding_secured or funding_secured)
    )

    return SimulationResult(success, users, partnerships, funding_secured)


def run_simulation(
    iterations: int,
    params: SimulationParams,
    targets: MissionTargets,
) -> Tuple[float, Dict[str, float]]:
    """Run multiple simulations and aggregate success rate and diagnostics."""

    if iterations <= 0:
        raise ValueError("Iterations must be positive")

    rng = random.Random(params.seed)

    results: List[SimulationResult] = [simulate_once(rng, params, targets) for _ in range(iterations)]

    success_rate = sum(result.success for result in results) / iterations

    user_counts = sorted(result.users for result in results)
    partnership_counts = sorted(result.partnerships for result in results)

    diagnostics = {
        "users_mean": mean(user_counts),
        "users_p10": percentile(user_counts, 0.10),
        "users_p50": percentile(user_counts, 0.50),
        "users_p90": percentile(user_counts, 0.90),
        "partnerships_mean": mean(partnership_counts),
        "partnerships_p10": percentile(partnership_counts, 0.10),
        "partnerships_p50": percentile(partnership_counts, 0.50),
        "partnerships_p90": percentile(partnership_counts, 0.90),
        "funding_hit_rate": sum(result.funding_secured for result in results) / iterations,
    }

    return success_rate, diagnostics


def format_diagnostics(success_rate: float, diagnostics: Dict[str, float]) -> str:
    return (
        f"Success probability: {success_rate:.1%}\n"
        f"Funding secured in runs: {diagnostics['funding_hit_rate']:.1%}\n"
        f"Active users – mean: {diagnostics['users_mean']:.0f}, "
        f"P10: {diagnostics['users_p10']:.0f}, P50: {diagnostics['users_p50']:.0f}, P90: {diagnostics['users_p90']:.0f}\n"
        f"Partnerships – mean: {diagnostics['partnerships_mean']:.2f}, "
        f"P10: {diagnostics['partnerships_p10']:.0f}, P50: {diagnostics['partnerships_p50']:.0f}, "
        f"P90: {diagnostics['partnerships_p90']:.0f}"
    )


def main() -> None:
    """Run the Monte Carlo simulation with illustrative defaults."""

    targets = MissionTargets(active_users=10000, partnerships=5, funding_secured=True)
    params = SimulationParams()

    iterations = 20000
    success_rate, diagnostics = run_simulation(iterations, params, targets)
    print(format_diagnostics(success_rate, diagnostics))

    print("\nAdjust `SimulationParams` and `MissionTargets` in mission_simulation.py to test new scenarios.")


if __name__ == "__main__":
    main()
