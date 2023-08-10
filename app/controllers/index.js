import { Person } from "../models/person.js";
import { ListPerson } from "../services/list-person.js";

import { Student } from "../models/student.js";
import { Employee } from "../models/employee.js";
import { Validation } from "../models/validation.js";

var validation = new Validation();


const listPerson = new ListPerson();

const domId = (id) => document.getElementById(id);

domId("btnResult").style.display = "none";


const stringify = localStorage.getItem("Person_LIST_KEY");
console.log(stringify);
const dsnv = listPerson.personList = JSON.parse(stringify);
console.log(dsnv);

const getFormvalues = () => {
  domId("personID").disabled = false;
  const id = domId("personID").value;
  const name = domId("namePerson").value;
  const address = domId("adressPerson").value;
  const email = domId("email").value;
  const type = domId("type").value;

  const person = new Person(
    id,
    name,
    address,
    email,
    type
  );
}

// $('#exampleModal').on('hidden.bs.modal', function () {
//   $(this).find('form').trigger('reset');
//   $(this).find('p').trigger('reset');
// })

// $('#exampleModal').on('hidden.bs.modal', function () {
//   $('#exampleModal form')[0].reset();
//   $('#exampleModal p')[0].reset();
// });

domId("openModal").onclick = () => {
  domId("labelModal").innerHTML = "Thêm người dùng";
  domId("formNhap").reset();
  domId("personID").disabled = false;
  domId("btnThem").style.display = "block";
  domId("btnCapNhat").style.display = "none";
  domId("type").disabled =false;
  domId("btnResult").style.display = "none";
  domId("divHocSinh").style.display = "none";
  domId("divNhanVien").style.display = "none";
  domId("btnresult").disabled = true;
  domId("footerTinhKQ").innerHTML = "";
  domId("footerTinhKQ").style.display = "none";

  
  

  // 
}


domId("btnThem").onclick = () => {
  domId("personID").disabled = false;
  const id = domId("personID").value;
  const name = domId("namePerson").value;
  const address = domId("adressPerson").value;
  const email = domId("email").value;
  const type = domId("type").value;


  

  var isvalid = true;

  isvalid &= validation.kiemtraRong(id, "txtErrorTK", "(*) vui lòng không để trống ") &&
    validation.kiemtraDodaiKyTu(
      id,
      "txtErrorTK",
      "(*) vui long nhap  tu 2-6 ký số ",
      2,
      6
    ) && validation.kiemtraMaNVTonTai(
      id,
      "txtErrorTK",
      "(*) mã nhân viên đã tồn tại",
      dsnv // biến list nv
    );


  isvalid &= validation.kiemtraRong(
    name,
    "txtErrorTen",
    "(*) vui lòng không để trống"
  ) &&
    validation.kiemtraChuoiKiTu(
      name,
      "txtErrorTen",
      "(*) vui long nhập đúng chuỗi ký tự",

    );

  // validation email

  isvalid &= validation.kiemtraRong(
    email,
    "txtErrorEmail",
    "(*) vui lòng không để trống "
  ) &&
    validation.checkPattern(
      email,
      "txtErrorEmail",
      "(*) vui lòng nhập email đúng dịnh dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ) &&
    validation.kiemtraEmailTonTai(
      email,
      "txtErrorEmail",
      "(*) Email đã tồn tại",
      dsnv
    );


  isvalid &= validation.kiemtraRong(address, "txtErrorAdd", "(*) vui lòng không để trống ")

  isvalid &= validation.kiemtraLoai(
    "type",
    "txtErrorType",
    "(*) vui lòng nhập loại"
  );


  if (isvalid) {
    const person = new Person(
      id,
      name,
      address,
      email,
      type
    );
    //const person = getFormvalues(); // tách hàm 
    listPerson.add(person);
    console.log(listPerson.personList);
    setLocalStorage();
    if (setLocalStorage) {
      alert("thêm thành công ");
    }
    renderTable();
    if (alert) {
      domId("btnClose").click();
    }

    return person;
  }//true tạo đối tượng 

  return null; //khi validation sai

};



const renderTable = (data = listPerson.personList) => {
  const content = data.reduce((total, element, index, array) => {
    total += `
      <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.address}</td>
        <td>${element.email}</td>
        <td>${element.type === "loai1" ? "Student" : element.type === "loai2" ? "Employee" : "Customer"} </td>
        <td>
          <button 
          onclick="openUpdateModal('${element.id}')"
          data-toggle="modal"
          data-target="#exampleModal"
          class="btn btn-primary ">Sửa </button>
          <button
            onclick="deletePerson('${element.id}')" 
            class="btn btn-danger" >XÓA</button>
          <button id="demo"
          onclick="openupChucNang('${element.id}')"
         
          data-toggle="modal"
          data-target="#exampleModal"
          
          class="btn btn-info">  ${element.type === "loai1" ? "Tính DTB" : element.type === "loai2" ? "Tính lương" : "[null]"} 
           </button>
         </td>
      </tr>
      `;
    return total;
  }, "");

  domId("tbodyFood").innerHTML = content;
}

window.openupChucNang = (personId) => {
  //  domId("btnChucnang").style.display = "block";
  domId("formNhap").reset();
 

  domId("labelModal").innerHTML = "chức năng";
  domId("btnThem").style.display = "none";
  domId("btnCapNhat").style.display = "none";
  domId("btnResult").style.display = "block";
  domId("type").disabled = true;

  const person = listPerson.findById(personId);

  const { id, name, address, email, type } = person; // bóc tách phần tử ra khỏi const person

  domId("personID").value = id;   // domId("personID").value = person.id;  viết rút gọn
  domId("personID").disabled = true;
  domId("namePerson").value = name;
  domId("adressPerson").value = address;
  domId("email").value = email;
  domId("type").value = type;


  const loai = domId("type").value = type;
  if (loai === "loai1") {
    //Do something
    
    document.getElementById("divHocSinh").style.display = "block";
    document.getElementById("divNhanVien").style.display = "none";
    domId("footerTinhKQ").innerHTML = " ";

  } else if (loai === "loai2") {
    domId("footerTinhKQ").innerHTML = " ";
    document.getElementById("divNhanVien").style.display = "block";
    document.getElementById("divHocSinh").style.display = "none";

  } else {
    domId("labelModal").innerHTML = "Chức năng này chưa có ";
    
    document.getElementById("divHocSinh").style.display = "none";
    document.getElementById("divNhanVien").style.display = "none";
    domId("footerTinhKQ").innerHTML = " chưa có chức năng loại đối tượng này &#128524";
    
  }

  


}

domId("btnResult").onclick = () => {
  const id = domId("personID").value   // domId("personID").value = person.id;  viết rút gọn
  const name = domId("namePerson").value
  const address = domId("adressPerson").value
  const email = domId("email").value
  const type = domId("type").value


  if (type === "loai1") {
    const math = domId("diemLy").value * 1;
    const physicial = domId("diemToan").value * 1;
    const chemistry = domId("diemHoa").value * 1;
    const student = new Student(id, name, address, email, type, math, physicial, chemistry);

    const tinhDTB = student.tinhDTB();
    console.log(tinhDTB);


    domId("footerTinhKQ").innerHTML = tinhDTB + " điểm";
  } else if (type === "loai2") {
    const datework = domId("datework").value * 1;
    const salary = domId("salary").value * 1;

    const employee = new Employee(id, name, address, email, type, datework, salary);
    const tinhLuong = employee.tinhLuong();

    var vietnam = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    domId("footerTinhKQ").innerHTML = vietnam.format(tinhLuong);
  }



}

let emailclone;
window.openUpdateModal = (personId) => {
  //console.log(id);
  
  domId("labelModal").innerHTML = "Sửa người dùng";
  domId("btnThem").style.display = "none";
  domId("btnCapNhat").style.display = "block";
  domId("type").disabled =false;
  domId("btnResult").style.display = "none";
  domId("divHocSinh").style.display = "none";
  domId("divNhanVien").style.display = "none";
  domId("footerTinhKQ").innerHTML = "";
  const person = listPerson.findById(personId);

  const { id, name, address, email, type } = person; // bóc tách phần tử ra khỏi const person

  domId("personID").value = id;   // domId("personID").value = person.id;  viết rút gọn
  domId("personID").disabled = true;
  domId("namePerson").value = name;
  domId("adressPerson").value = address;
  emailclone = domId("email").value = email;
  domId("type").value = type;
  return emailclone;


}




domId("btnCapNhat").onclick = () => {
  console.log(emailclone);
  const id = domId("personID").value   // domId("personID").value = person.id;  viết rút gọn
  const name = domId("namePerson").value
  const address = domId("adressPerson").value
  const email = domId("email").value
  const type = domId("type").value

  var isvalid = true;




  isvalid &= validation.kiemtraRong(
    name,
    "txtErrorTen",
    "(*) vui lòng không để trống"
  ) &&
    validation.kiemtraChuoiKiTu(
      name,
      "txtErrorTen",
      "(*) vui long nhập đúng chuỗi ký tự",

    );


  if (email != emailclone) {//
    // false validattion email đễ ko xét email đã tồn tại(đang cập nhật) => tiếp tục code cập nhật

    isvalid &= validation.kiemtraRong(
      email,
      "txtErrorEmail",
      "(*) vui lòng không để trống "
    ) &&
      validation.checkPattern(
        email,
        "txtErrorEmail",
        "(*) vui lòng nhập email đúng dịnh dạng",
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ) &&
      validation.kiemtraEmailTonTai(
        email,
        "txtErrorEmail",
        "(*) Email đã tồn tại",
        dsnv
      );

  }







  isvalid &= validation.kiemtraRong(address, "txtErrorAdd", "(*) vui lòng không để trống ")

  isvalid &= validation.kiemtraLoai(
    "type",
    "txtErrorType",
    "(*) vui lòng nhập loại"
  );


  if (isvalid) {

    const person = new Person(
      id,
      name,
      address,
      email,
      type
    );

    //const person = getFormvalues();


    listPerson.update(person);
    //saveData();
    setLocalStorage();

    if (setLocalStorage) {

      renderTable();
      alert("cập nhật thành công");
      if (alert) {
        domId("btnClose").click();
      }
    }
    return person;
  }
  return null;

}

//domId("btnCapNhat").onclick(false,false);

const saveData = () => {//dùng gọi lại 
  setLocalStorage();
  renderTable();

}

window.deletePerson = (id) => {
  console.log(id);
  var xoa = confirm("bạn có chắc muốn xóa ");
  if (xoa) {
    listPerson.delete(id);

    //saveData();
    setLocalStorage();//lưu
    renderTable();
  }

};


domId("selLoai").onchange = () => {
  const type = domId("selLoai").value;
  console.log(type);
  const data = listPerson.filterbyType(type);
  renderTable(data);
}

domId("selSort").onclick = () => {
  const type = domId("selLoai").value;
  console.log(type);
  const data = listPerson.sortByName(type);
  renderTable(data);
}

const setLocalStorage = () => {
  const stringify = JSON.stringify(listPerson.personList);
  localStorage.setItem("Person_LIST_KEY", stringify);
};


const getLocalStorage = () => {
  const stringify = localStorage.getItem("Person_LIST_KEY");

  if (stringify) {
    listPerson.personList = JSON.parse(stringify);

  }
};

window.onload = () => {
  //running

  getLocalStorage();
  renderTable();
}

$(document).on("hidden.bs.modal", "#modalid", function () {
  $(this).find('#form')[0].reset();
});