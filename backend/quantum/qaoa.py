# /backend/quantum/qaoa.py

from qiskit import Aer
from qiskit.algorithms import QAOA
from qiskit.primitives import Sampler
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit.circuit.library import TwoLocal
from qiskit.utils import algorithm_globals

def run_qaoa():
    """
    Run QAOA to solve a simple optimization problem.
    Returns:
        list: The optimal solution found by QAOA.
    """
    # Define the optimization problem
    qp = QuadraticProgram()
    num_vars = 3
    for i in range(num_vars):
        qp.binary_var(name=f'x{i}')

    # Objective function: minimize x0 + x1 + x2
    linear = {f'x{i}': 1 for i in range(num_vars)}
    qp.minimize(linear=linear)

    # Convert to QUBO
    qubo = qp.to_ising()

    # Set random seed for reproducibility
    algorithm_globals.random_seed = 42

    # Define the optimizer and ansatz
    optimizer = None  # Default optimizer (COBYLA)
    ansatz = TwoLocal(num_qubits=num_vars, reps=1, rotation_blocks='ry', entanglement_blocks='cz')

    # Use the Sampler primitive with QAOA
    sampler = Sampler(session=AerSimulator())
    qaoa_mes = QAOA(sampler=sampler, optimizer=optimizer, reps=1, initial_point=[0.0]*ansatz.num_parameters)

    # Create the Minimum Eigen Optimizer
    optimizer = MinimumEigenOptimizer(qaoa_mes)
    result = optimizer.solve(qp)

    return result.x
