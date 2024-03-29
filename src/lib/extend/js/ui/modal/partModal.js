import {nd} from "../../notes/NotesData.js";
import {async_redraw, state} from "../../abc/abchelper.js";
import {saveState} from "../../state/history.js";
import { showModal } from "../lib/modal.js";

const standardNames = ['Sop.', 'Alt.', 'Ten.', 'Bas.'];

function showCheckLocked(v) {
  let st = '';
  st += `<div class="form-check">`;
  st += `<input type="checkbox" class="form-check-input" name="check_voiceLocked" id="check_voiceLocked" ${nd.voices[v].locked ? "checked" : ""}>`;
  st += `<label class="form-check-label" for="check_voiceLocked">Prohibit note editing in this part</label>`;
  st += `</div><br>`;
  return st;
}

function showInputPartName(v) {
  let st = '';
  st += `<div class="form-group">`;
  st += `<label for="input_partName"><b>Part name</b></label>`;
  st += `<input class="form-control" id=input_partName name=input_partName value="${nd.voices[v].name}">`;
  st += `</input>`;
  st += `</div>`;
  return st;
}

function showSelectPartName(v) {
  let st = '';
  st += `<div class="form-group">`;
  st += `<label for="sel_partName"><b>Vocal range</b></label>`;
  st += `<select class="form-control custom-select" id=sel_partName name=sel_partName>`;
  let cur_name = nd.voices[v].name;
  let foundStandard = false;
  for (const name of standardNames) {
    let sel = "";
    if (cur_name.toLowerCase().startsWith(name.toLowerCase().slice(0, -1))) {
      sel = "selected";
      foundStandard = true;
    } else sel = "";
    st += `<option value="${name}" ${sel}>${name}</option>`;
  }
  if (!foundStandard) {
    let sel = "selected";
    st += `<option value="${cur_name}" ${sel}>Auto</option>`;
  }
  st += `</select>`;
  st += `</div>`;
  return st;
}

function showSelectSpecies(v) {
  let st = '';
  st += `<div class="form-group">`;
  st += `<label for="sel_partSpecies"><b>Counterpoint species</b></label>`;
  st += `<select class="form-control custom-select" id=sel_partSpecies name=sel_partSpecies>`;
  let cur_sp = nd.voices[v].species;
  let sel = "";
  if (cur_sp === 10) sel = "selected";
  else sel = "";
  st += `<option value=10 ${sel}>Auto detect</option>`;
  if (cur_sp === 0) sel = "selected";
  else sel = "";
  st += `<option value=0 ${sel}>Cantus firmus</option>`;
  for (let sp=1; sp<6; ++sp) {
    sel = "";
    if (sp === cur_sp) sel = "selected";
    st += `<option value=${sp} ${sel}>Counterpoint species ${sp}</option>`;
  }
  st += `</select>`;
  st += `</div>`;
  return st;
}

export function showPartModal(v) {
  if (state.state !== 'ready') return;
  let st = '';
  st += showSelectPartName(v);
  //st += showInputPartName(v);
  if (nd.algo === 'CA3') {
    st += showSelectSpecies(v);
  }
  st += showCheckLocked(v);
  let footer = '';
  footer += `<button type="button" class="btn btn-primary" id=modalOk>OK</button>`;
  footer += `<button type="button" class="btn btn-secondary" data-dismiss="modal" id=modalCancel>Cancel</button>`;
  showModal(1, 'Part', st, footer, [], [], true, ()=>{}, ()=>{});
  $('#check_voiceLocked').change(() => {
  });
  $('#modalOk').click(() => {
    nd.set_voiceLocked(v, $('#check_voiceLocked').is(":checked"));
    //nd.set_voiceName(v, $('#input_partName').val().substr(0, 50));
    if (nd.algo === 'CA3') {
      nd.set_species(v, Number($("#sel_partSpecies option:selected").val()));
    }
    nd.set_voiceName(v, $("#sel_partName option:selected").val());
    $('#Modal1').modal('hide');
    saveState();
    async_redraw();
  });
}
