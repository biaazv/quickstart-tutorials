function main() {
    const dataset = loadJson('data/candidatos.json');
    const errors = validateDataset(dataset);
    if (errors.length > 0) {
        throw new Error(`build interrompido: ${errors.length}
        erro(s) de dados`);
    }

    const summary = summarize(dataset);
    const approved = dataset.candidates
        .filter((candidate) => candidate.status === 'APROVADO')
        .map(({ registration, name, score }) => ({ registration,
        name, score }));

    ensureDir('dist');
    fs.copyFileSync('public/index.html', path.join('dist',
    'index.html'));

    const report = {
        process: dataset.metadata.processo,
        version: dataset.metadata.version,
        generatedAt: new Date().toISOString(),

        summary,
        approved
    };

    fs.writeFileSync('dist/relatorio.json',
    `${JSON.stringify(report, null, 2)}\n`);
    console.log(`RELATÓRIO GERADO: ${approved.length} aprovados
    de ${summary.total} candidatos`);
}
