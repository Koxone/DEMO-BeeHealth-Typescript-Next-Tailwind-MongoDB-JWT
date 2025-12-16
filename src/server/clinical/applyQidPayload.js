import set from 'lodash/set';
import { QID_TO_PATH } from './qidToPath';

// Block: Checkbox qids
const CHECKBOX_QIDS = new Set([
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38, // Info general
  82,
  83,
  84,
  85,
  86,
  87, // Heredofamiliares
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99,
  100,
  101,
  102,
  103,
  104,
  105,
  106,
  107,
  108,
  109,
  110, // Personales patológicos
  126,
  127,
  128,
  129,
  130,
  131, // Inmunizaciones
]);

// Block: Coercion
function coerceCheckbox(qid, value) {
  if (!CHECKBOX_QIDS.has(qid)) return value;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    if (v === 'sí' || v === 'si' || v === 'yes' || v === 'true' || v === '1') return true;
    if (v === 'no' || v === 'false' || v === '0') return false;
  }
  return value;
}

// Block: Builder
export function buildClinicalPayloadFromQIds({
  answersByQId = {},
  selectedQIds = [],
  templateVersion = 1,
}) {
  const payload = {};
  for (const [qidStr, raw] of Object.entries(answersByQId)) {
    const qid = Number(qidStr);
    const path = QID_TO_PATH[qid];
    if (!path) continue;
    const value = coerceCheckbox(qid, raw);
    set(payload, path, value);
  }
  return {
    payload,
    meta: { answersByQId, selectedQIds, templateVersion },
  };
}
