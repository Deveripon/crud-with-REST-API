function alertMassage(massage, type) {
	return `
     <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${massage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>
    `;
}
alertMassage();
