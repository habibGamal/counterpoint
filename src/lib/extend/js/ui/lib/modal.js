import { enableKeys } from "../commands.js";
import { button_active } from "./uilib.js";
// import box from '../../../plugin/bootbox/bootbox'
// import { popper } from "@popperjs/core/index.js";
import '../../../plugin/bootstrap-4.3.1/js/bootstrap.bundle.js'
export function showModal(id, title, body, footer, classes, classesDialog, pauseKeys, shown, hidden) {
    if (pauseKeys) {
        enableKeys(false);
    }
    document.getElementById(`ModalTitle${id}`).innerHTML = title;
    document.getElementById(`ModalBody${id}`).innerHTML = body;
    document.getElementById(`ModalFooter${id}`).innerHTML = footer;
    console.log('error here');
    for (const clas of classes) {
        $(`#Modal${id}`).addClass(clas);
    }
    for (const clas of classesDialog) {
        $(`#ModalDialog${id}`).addClass(clas);
    }
    $(`#Modal${id}`).on("shown.bs.modal", function () {
        shown();
    });
    $(`#Modal${id}`).on("hidden.bs.modal", function () {
        for (const clas of classes) {
            $(`#Modal${id}`).removeClass(clas);
        }
        for (const clas of classesDialog) {
            $(`#ModalDialog${id}`).removeClass(clas);
        }
        if (pauseKeys) {
            enableKeys(true);
        }
        $(`#Modal${id}`).off("shown.bs.modal");
        $(`#Modal${id}`).off("hidden.bs.modal");
        hidden();
    });
    $(`#Modal${id}`).modal();
}

export function showMultiButtonSelect(id, selectedId, options, userHandler) {
    let st = "";
    st += `<span>`;
    for (let i = 0; i < options.length; ++i) {
        const oid = `${id}${options[i].id}`;
        if (options[i].newline) st += `<br>`;
        st += `<a id='${oid}' class='btn btn-outline-white p-2' href=# role='button' style='font-size: 1em'>`;
        st += `${options[i].text}`;
        st += `</a> `;
        setTimeout(() => {
            document.getElementById(oid).onclick = function () {
                $(`#${id}${options[0].id}`).attr("data-value", options[i].id);
                for (let x = 0; x < options.length; ++x) {
                    const oid2 = `${id}${options[x].id}`;
                    button_active(oid2, oid === oid2);
                }
                if (userHandler) userHandler();
            };
        }, 0);
    }
    setTimeout(() => {
        $(`#${id}${options[0].id}`).attr("data-value", selectedId);
        button_active(`${id}${selectedId}`, true);
    }, 0);
    st += `</span>`;
    return st;
}

export function showSelectWithLabel(label, id, selected, options, onchange) {
    let st = "";
    st += `<div class="form-group">`;
    st += `<label for="${id}"><b>${label}</b></label>`;
    st += showSelect(id, selected, options, onchange);
    st += `</div>`;
    return st;
}

export function showSelect(id, selected, options, onchange) {
    let st = "";
    st += `<select class="form-control custom-select" id=${id}>`;
    for (const option of options) {
        st += `<option value='${option.val}' ${selected === option.val ? "selected" : ""}>${option.text}</option>`;
    }
    st += `</select>`;
    if (onchange) {
        setTimeout(() => {
            $(`#${id}`).change(() => {
                const val = $(`#${id}`).val();
                onchange(val);
            });
        }, 0);
    }
    return st;
}
