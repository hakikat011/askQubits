# /backend/quantum/qmc.py

from qiskit import QuantumCircuit
from qiskit.primitives import Sampler
from qiskit_aer import AerSimulator

def run_quantum_monte_carlo(num_qubits=3, num_shots=1024):
    """
    Perform a quantum Monte Carlo simulation.
    Args:
        num_qubits (int): Number of qubits to use in the simulation.
        num_shots (int): Number of shots for sampling.
    Returns:
        float: The expected value from the simulation.
    """
    # Build the quantum circuit
    qc = QuantumCircuit(num_qubits)
    qc.h(range(num_qubits))  # Create a superposition
    qc.measure_all()

    # Use the Sampler primitive
    sampler = Sampler(session=AerSimulator())
    job = sampler.run(circuits=[qc], shots=num_shots)
    result = job.result()
    quasi_dist = result.quasi_dists[0]

    # Convert quasi-probabilities to probabilities
    probabilities = {state: abs(prob) for state, prob in quasi_dist.items()}

    # Calculate the expected value
    expected_value = sum(int(state, 2) * prob for state, prob in probabilities.items())

    return expected_value
