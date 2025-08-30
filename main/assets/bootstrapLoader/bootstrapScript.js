const bootstrapScript = document.createElement('script');
bootstrapScript.src = 'bootstrapLoader/bootstrap.bundle.min.js';
document.body.appendChild(bootstrapScript);
bootstrapScript.onload = () => {
    const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle='tooltip']");
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
