let bootstrapScript = document.createElement('script');
bootstrapScript.src = 'bootstrapLoader/bootstrap.bundle.min.js';
document.body.appendChild(bootstrapScript);
bootstrapScript.onload = () => {
    let tooltipTriggerList = document.querySelectorAll("[data-bs-toggle='tooltip']");
    let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
