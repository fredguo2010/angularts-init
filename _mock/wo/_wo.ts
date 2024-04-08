import { MockRequest } from '@delon/mock';

const list: any[] = [];
const total = 10;

for (let i = 0; i < total; i += 1) {
  list.push({
    order_key: i + 1,
    site_num: ['上海', '苏州', '成都', '北京', '青岛', '大连'][i % 6],
    order_number: `wo${i}`,
    part_number: `part${i}`,
    customer: `CustomerA`,
    entered_time: new Date(`2022-04-${Math.floor(i / 2) + 1}`),
    promised_time: new Date(`2022-06-${Math.floor(i / 2) + 1}`),
    finished_time: new Date(`2022-05-${Math.floor(i / 2) + 1}`),
    closed_time: new Date(`2022-07-${Math.floor(i / 2) + 1}`),
    description: `This order is for ...`,
    order_state: ['Created', 'Started', 'Pending', 'Finished', 'Shipped', 'Closed'][i % 6],
    route_step: ['下料', '成型', '折弯', '机加', '组装', '入库'][i % 6],
    contact_person: `cwz`,
    avatar: ['assets/images/avatar/worker1.png', 'assets/images/avatar/worker2.png', 'assets/images/avatar/worker3.png'][i % 3],
    contact_phone: '18662246258',
    shipping_method: ['assets/images/avatar/air.png', 'assets/images/avatar/ship.png', 'assets/images/avatar/trunk.png'][i % 3],
    addr_name: 'xxxxx',
    addr_city: 'sz',
    addr_state: 'js',
    addr_zip: '21500',
    email_address: 'xxx@rockwell.com',
    creation_time: new Date(`2022-02-${Math.floor(i / 2) + 1}`),
    last_modified_time: new Date(`2022-05-${Math.floor(i / 2) + 1}`)
  });
}

function genData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  ret.reverse();
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.order_number) {
    ret = ret.filter(data => data.order_number.indexOf(params.order_number) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(order_key: number, value: any): { msg: string } {
  //console.log(`#####id${order_key}`);
  if (isNaN(order_key)) {
    order_key = Math.floor(Math.random() * 10000);
  }
  const item = list.find(w => w.order_key === order_key);
  //console.log(`@@@@ITEM${item}`);
  if (!item) {
    value.order_key = order_key;
    list.push(value);
    return { msg: 'ok' };
  }
  Object.assign(item, value);
  //console.log(`saved!!!!!!!`);
  return { msg: 'ok' };
}

export const WORKORDERS = {
  '/wo': (req: MockRequest) => genData(req.queryString),
  '/wo/:order_number': (req: MockRequest) => list.find(w => w.order_number === req.params.order_number),
  'POST /wo/:id': (req: MockRequest) => saveData(+req.params.id, req.body)
};
