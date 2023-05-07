let modalContainer = document.querySelector('#modal-campos-container');

export function modalCampos(opc){
    let html;
    if(opc === 1){
        html = /* html */ `
            <dialog class="modal alert" id='alert'>
                <div class="error">
                    <div>
                        <p>Error</p>            
                    </div>
                    <button id="btn-close-modal-campos2" class='btn-alert'><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-content">
                    <div class="modal-content-text">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <p>Debes Llenar Todos Los Campos</p>
                    </div>
                    <Button class="btn btn-red" id="btn-close-modal-campos">Aceptar</Button>
                </div>
            </dialog>
        `
    } else {
        html = /* html */ `
            <dialog class="modal alert" id='alert'>
                <div class="error">
                    <div>
                        <p>Error</p>            
                    </div>
                    <button id="btn-close-modal-campos2" class='btn-alert'><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-content">
                    <div class="modal-content-text">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <p>La Semilla Debe de Ser de 4 Dígitos</p>
                    </div>
                    <Button class="btn btn-red" id="btn-close-modal-campos">Aceptar</Button>
                </div>
            </dialog>
        `
    }
    modalContainer.innerHTML = html;

    let modal = document.querySelector('#alert');
    let btn = document.querySelector('#btn-close-modal-campos');
    let btn2 = document.querySelector('#btn-close-modal-campos2');

    btn.addEventListener('click', () => {modal.close();});
    btn2.addEventListener('click', () => {modal.close();});
    
    modal.showModal();
}