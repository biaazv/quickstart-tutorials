function validateCandidate(candidate, index, minimumScore) {
	const errors = [];
	const required = ['registration', 'cpf', 'name', 'score','status'];
	
	for (const field of required) {
	if (candidate[field] === undefined || candidate[field] === null || candidate[field] === '') {
	        errors.push(`registro ${index + 1}: campo obrigatório ausente: ${field}`);
        }
    }

    if (!/^\d{11}$/.test(String(candidate.cpf ?? ''))) {
        errors.push(`registro ${index + 1}: CPF deve conter exatamente dígitos`);
    }

    if (!Number.isFinite(candidate.score) || candidate.score < 0 || candidate.score > 100) {
            errors.push(`registro ${index + 1}: nota fora do intervalo 0..100`);
	} 
	
	const expectedStatus = candidate.score >= minimumScore ? 'APROVADO' : 'LISTA_ESPERA';
	if (candidate.status !== expectedStatus) {
	    errors.push(`registro ${index + 1}: status ${candidate.status} incompatível com nota ${candidate.score}; esperado ${expectedStatus}`
        );
    }
    return errors;
}