document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', plotGraph);
});

function plotGraph() {
    const parametersInput = document.getElementById('parameters');
    const parameters = parametersInput.value.split(',').map(param => parseInt(param.trim()));

    const values = Array.from({ length: parameters[1] - parameters[0] + 1 }, (_, index) => index + parameters[0]);
    const probabilities = Array.from({ length: values.length }, (_, index) => 1 / (parameters[1] - parameters[0] + 1));

    const ctxProbability = document.getElementById('probabilityChart').getContext('2d');
    const ctxCumulative = document.getElementById('cumulativeChart').getContext('2d');

    clearChart(ctxProbability);
    clearChart(ctxCumulative);

    createChart(ctxProbability, values, probabilities, 'Função de Massa de Probabilidade');

    const cumulativeProbabilities = probabilities.reduce((acc, prob) => {
        const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
        acc.push(lastValue + prob);
        return acc;
    }, []);

    createChart(ctxCumulative, values, cumulativeProbabilities, 'Função de Probabilidade Acumulada');
}

function clearChart(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function createChart(ctx, labels, data, label) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    min: 0,
                    max: 1
                }
            }
        }
    });
}
