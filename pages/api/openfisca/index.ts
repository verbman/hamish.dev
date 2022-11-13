import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import type { Data, Structure } from '../../../lib/types/kumu'
import nc from 'next-connect';
import fs from 'fs';
import path from 'path';
import kumu from '../../experiments/openfisca/data/kumu.json'

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {

  await runMiddleware(req, res, cors)
  
  const newBuild = req.query.build && req.query.build === "true";
  let obj: Data = { elements: [], connections: [] };

  const processLabel = (x: string) => {
    return toTitleCase(x.replace(/_/g, ' '));
  }
  
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
  }

  if (newBuild) { //this times out on netlify so doing it manually first
    let keys = [];
    let variableslongform = [];

    let structure: Structure[] = [];
    let variables = [];

    try {
      const res = await fetch(`https://raw.githubusercontent.com/digitalaotearoa/openfisca-aotearoa/main/openfisca_aotearoa/structure.json`);
      let g = await res.json();
      structure = g.structure;
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

    

    if (variableslongform.length >= keys.length) {

      var types: string[] = [];
      var id = '';

      for (var v in variableslongform) {
        id = variableslongform[v]['id'];
        var c = id.split('__');
        if (c.length > 1) {
          id = c[1];
          obj.connections.push({ from: c[0], to: variableslongform[v]['id'], type: 'belongs', direction: "directed" });
          if (!types.includes(c[0])) {
            types.push(c[0]);
            if (structure.some(x => x.Prefix == c[0])) {
              var detail = structure.find(x => x.Prefix == c[0]) as Structure;
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
          if (!types.includes('generic')) {
            types.push('generic');
            obj.elements.push({ id: 'generic', label: 'Generic', type: 'Instrument', description: '', reference: '', source: '', valuetype: '' });
          }
        }
        obj.elements.push({ id: variableslongform[v]['id'], label: processLabel(id), type: 'Variable', description: variableslongform[v]['description'], reference: variableslongform[v]['references'], source: variableslongform[v]['source'], valuetype: variableslongform[v]['valueType'] });
      }
    }

    fs.writeFileSync(path.join(process.cwd(), 'pages/experiments/openfisca/data/kumu.json'), JSON.stringify(obj));
  }else{
    obj = kumu as Data;
  }

  res.status(200).json(obj)
});


export default handler;

/*
// https://rac.g0v.nz/variable/home_help__adopted_2_or_more_children output
{
  "id":"home_help__adopted_2_or_more_children",
  "description":"Have or adopted twins, and already has another child under 5.",
  "valueType":"Boolean",
  "defaultValue":false,
  "definitionPeriod":"MONTH",
  "entity":"person",
  "source":"https://github.com/ServiceInnovationLab/openfisca-aotearoa/blob/16.0.0/openfisca_aotearoa/variables/other/home_help.py#L17-L22",
  "references":["https://www.workandincome.govt.nz/map/legislation/welfare-programmes/home-help-programme/index.html"]
}

// https://rac.g0v.nz/variables output (partial)
{
  "home_help__adopted_2_or_more_children": {
    "description":"Have or adopted twins, and already has another child under 5.",
    "href":"https://rac.g0v.nz/variable/home_help__adopted_2_or_more_children"
  },
  "home_help__eligible_for_home_help": {
    "description":"Eligible for Home Help",
    "href":"https://rac.g0v.nz/variable/home_help__eligible_for_home_help"
  },
}
*/