# /backend/quantum/quantum_pipeline.py

from .ae import run_amplitude_estimation
from .qmc import run_quantum_monte_carlo
from .qaoa import run_qaoa

def run_quantum_pipeline(query):
    """
    Run the quantum pipeline with AE, QMC, and QAOA.
    Args:
        query (str): The user's query.
    Returns:
        str: The combined report.
    """
    # Map the query to numerical values or parameters
    probability = sum(ord(c) for c in query) % 100 / 100  # Map to [0, 1]
    
    # Run Amplitude Estimation
    ae_result = run_amplitude_estimation(probability)
    ae_report = f"Estimated amplitude (probability of |1>): {ae_result:.4f}"

    # Run Quantum Monte Carlo
    qmc_result = run_quantum_monte_carlo()
    qmc_report = f"Expected value from Quantum Monte Carlo simulation: {qmc_result:.4f}"

    # Run QAOA
    qaoa_result = run_qaoa()
    qaoa_report = f"Optimal solution found by QAOA: {qaoa_result}"

    # Generate the combined report
    report = f"**Query:** {query}\n\n"
    report += f"**Amplitude Estimation Result:**\n{ae_report}\n\n"
    report += f"**Quantum Monte Carlo Result:**\n{qmc_report}\n\n"
    report += f"**QAOA Optimization Result:**\n{qaoa_report}\n\n"
    report += "This report was generated using simulated quantum computations."

    return report
