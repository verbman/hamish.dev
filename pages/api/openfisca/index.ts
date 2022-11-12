
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  elements: Element[];
  connections: Connection[];
}

type Connection = {
  from: string;
  to: string;
  type: string;
  direction: string;
}

type Element = {
  id: string;
  label: string;
  type: string;
  description: string;
  reference: string;
  source: string;
  valuetype: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let keys = [];
  let variableslongform = [];
  let obj: Data = { elements: [], connections: [] };

  let structure = [];
  let variables = [];

  try {
    const res = await fetch(`https://raw.githubusercontent.com/digitalaotearoa/openfisca-aotearoa/main/openfisca_aotearoa/structure.json`);
    structure = await res.json();
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await fetch(`https://rac.g0v.nz/variables`);
    variables = await res.json();
  } catch (err) {
    console.log(err);
  }

  for (var key in variables) {
    if (variables.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  for (var j = 0; j < keys.length; j++) {
    try {
      const res = await fetch(`https://rac.g0v.nz/variable/` + keys[j]);
      let output = await res.json();
      variableslongform.push(output);
    } catch (err) {
      console.log(err);
    }
  }

  function processLabel(x: string) {
    return toTitleCase(x.replace(/_/g, ' '));
  }

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
  }

  if (variableslongform.length >= keys.length) {

    var acts: string[] = [];
    var id = '';

    for (var v in variableslongform) {
      id = variableslongform[v]['id'];
      var c = id.split('__');
      if (c.length > 1) {
        id = c[1];
        obj.connections.push({ from: c[0], to: variableslongform[v]['id'], type: 'belongs', direction: "directed" });
        if (!acts.includes(c[0])) {
          acts.push(c[0]);
          if (structure[c[0]]) {
            var detail = structure[c[0]];
            obj.elements.push({ id: c[0], label: detail.Title, type: detail.Type, description: '', reference: detail.Reference, source: '', valuetype: '' });
            if (detail.Children && detail.Children.length > 0) {
              for (var z = 0; z < detail.Children.length; z++) {
                obj.connections.push({ from: c[0], to: detail.Children[z], type: 'Flow', direction: "directed" });
              }
            }
          } else {
            obj.elements.push({ id: c[0], label: processLabel(c[0]), type: 'Instrument', description: '', reference: "", source: '', valuetype: '' });
          }
        }
      } else {
        obj.connections.push({ from: 'generic', to: variableslongform[v]['id'], type: 'belongs', direction: "directed" });
        if (!acts.includes('generic')) {
          acts.push('generic');
          obj.elements.push({ id: 'generic', label: 'Generic', type: 'Instrument', description: '', reference: '', source: '', valuetype: '' });
        }
      }
      obj.elements.push({ id: variableslongform[v]['id'], label: processLabel(id), type: 'Variable', description: variableslongform[v]['description'], reference: variableslongform[v]['references'], source: variableslongform[v]['source'], valuetype: variableslongform[v]['valueType'] });
    }
  }

  res.status(200).json(obj)
}
