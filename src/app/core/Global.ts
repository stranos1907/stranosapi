import { ToastrService } from "ngx-toastr";

export class GlobalVariable {

  sourceList = [SOURCE_DEALER, SOURCE_CALL_CENTER, SOURCE_PHONE, SOURCE_SMS, SOURCE_WHATSAPP
    , SOURCE_HEPSIEXPRESS, SOURCE_TRENDYOL, SOURCE_YEMEKSEPETI, SOURCE_BISU];

  orderStatusList=[
    {_id:0,name:'BEKLEMEDE'},
    {_id:1,name:'ÖDEME BEKLENİYOR'},
    {_id:2,name:'HAZIRLANIYOR'},
    {_id:3,name:'HAZIRLANDI'},
    {_id:4,name:'KARGOLANDI'},
    {_id:5,name:'TESLİM EDİLDİ'},
    {_id:6,name:'İPTAL'}
  ]
  checkError(err, toastr: ToastrService) {

    if (err.status == 403) {

      localStorage.removeItem('token');
      localStorage.removeItem('roleToken');
      window.location.reload();
    } else if (err.status != 400 && err.status != 401) {
      toastr.error(err.message, 'Bir Hata Oluştu');

    }

  }

  public EXPENSE_CAT = 0
  public PRODUCT_CAT = 1
}


const SOURCE_DEALER = {
  _id: 1,
  name: 'Bayi'
}
const SOURCE_CALL_CENTER = {
  _id: 2,
  name: 'Çağrı Merkezi'
}
const SOURCE_PHONE = {
  _id: 3,
  name: 'Telefon'
}
const SOURCE_SMS = {
  _id: 4,
  name: 'Sms'
}
const SOURCE_WHATSAPP = {
  _id: 5,
  name: 'Whatsapp'
}
const SOURCE_HEPSIEXPRESS = {
  _id: 6,
  name: 'HepsiExpress'
}
const SOURCE_TRENDYOL = {
  _id: 7,
  name: 'Trendyol'
}
const SOURCE_YEMEKSEPETI = {
  _id: 8,
  name: 'Yemeksepeti'
}
const SOURCE_BISU = {
  _id: 9,
  name: 'BiSu'
}
