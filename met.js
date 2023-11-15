'use script'
function solveGaussSeidel() {
    // Obtener valores del formulario
    var matrixA = parseMatrix(document.getElementById('matrixA').value);
    var vectorB = parseVector(document.getElementById('vectorB').value);
    var initialGuess = parseVector(document.getElementById('initialGuess').value);
    var maxIterations = parseInt(document.getElementById('maxIterations').value);

    // Validar las dimensiones de la matriz y el vector
    if (matrixA.length !== vectorB.length || matrixA[0].length !== initialGuess.length) {
        alert('Las dimensiones de la matriz y el vector no son compatibles.');
        return;
    }

    // Lógica del método de Gauss-Seidel
    var result = gaussSeidel(matrixA, vectorB, initialGuess, maxIterations);

    // Mostrar el resultado
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Resultado del método de Gauss-Seidel:</p>';
    resultDiv.innerHTML += '<p>' + result.join(', ') + '</p>';
}

// Funciones de ayuda para analizar la entrada del formulario
function parseMatrix(input) {
    return input.split(';').map(row => row.split(',').map(Number));
}

function parseVector(input) {
    return input.split(',').map(Number);
}

// Implementación del método de Gauss-Seidel
function gaussSeidel(matrixA, vectorB, initialGuess, maxIterations) {
    var n = matrixA.length;
    var x = initialGuess.slice(); // Copiar la aproximación inicial

    for (var k = 0; k < maxIterations; k++) {
        for (var i = 0; i < n; i++) {
            var sigma = 0;
            for (var j = 0; j < n; j++) {
                if (j !== i) {
                    sigma += matrixA[i][j] * x[j];
                }
            }
            x[i] = (vectorB[i] - sigma) / matrixA[i][i];
        }
    }

    return x;
}