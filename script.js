const plots = document.querySelectorAll('.soil');
const rainButton = document.getElementById('rainButton');
const plantStatus = document.getElementById('plantStatus');

// Função para plantar
plots.forEach(plot => {
    plot.addEventListener('click', () => {
        if (!plot.classList.contains('planted')) {
            plot.classList.add('planted');
            const plant = plot.dataset.plant;
            const li = document.createElement('li');
            li.textContent = `Você plantou ${plant}! 🌱`;
            plantStatus.appendChild(li);
        }
    });
});

// Função para "regar"
rainButton.addEventListener('click', () => {
    plots.forEach(plot => {
        if (plot.classList.contains('planted')) {
            const plant = plot.dataset.plant;
            const li = document.createElement('li');
            li.textContent = `A ${plant} cresceu após a chuva! ☔🌿`;
            plantStatus.appendChild(li);
            plot.style.transform = 'scale(1.3)';
            setTimeout(() => {
                plot.style.transform = 'scale(1)';
            }, 500);
        }
    });
});
