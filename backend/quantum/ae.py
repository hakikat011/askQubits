# /backend/quantum/ae.py

from qiskit import QuantumCircuit
from qiskit.primitives import Estimator
from qiskit.quantum_info import SparsePauliOp
from qiskit_aer import AerSimulator

def run_amplitude_estimation(probability):
    """
    Perform amplitude estimation for a given probability.
    Args:
        probability (float): The probability to estimate (between 0 and 1).
    Returns:
        float: The estimated amplitude.
    """
    # Create a quantum circuit that encodes the probability
    qc = QuantumCircuit(1)
    qc.ry(2 * probability * 3.1416, 0)
    qc.measure_all()

    # Define the estimator primitive
    estimator = Estimator(session=AerSimulator())

    # Observable: Z operator
    observable = SparsePauliOp.from_list([('Z', 1)])

    # Run the estimator
    job = estimator.run(circuits=[qc], observables=[observable])
    result = job.result()
    expectation_value = result.values[0]

    # Estimate the amplitude (probability of measuring |1>)
    amplitude = (1 - expectation_value) / 2

    return amplitude
