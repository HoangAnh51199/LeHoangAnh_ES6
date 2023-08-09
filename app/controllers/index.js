import { Person } from "../models/person.js";
import { ListPerson } from "../services/list-person.js";

import { Student } from "../models/student.js";
import { Employee } from "../models/employee.js"


const listPerson = new ListPerson();

const domId = (id) => document.getElementById(id);

domId("btnResult").style.display = "none";


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

  return person;
}

domId("openModal").onclick = () => {
  domId("labelModal").innerHTML = "Thêm người dùng";
  domId("formNhap").reset();
  domId("personID").disabled = false;
  domId("btnThem").style.display = "block";
  domId("btnCapNhat").style.display = "none";

  // domId("divHocSinh").style.display = "none";
  // domid("divNhanVien").style.display = "none";
  // 


}


domId("btnThem").onclick = () => {
  // domId ("personID").disabled = false;
  // const id = domId("personID").value;
  // const name = domId("namePerson").value;
  // const address = domId("adressPerson").value;
  // const email = domId("email").value;
  // const type = domId("type").value;

  // const person = new Person(
  //   id,
  //   name,
  //   address,
  //   email,
  //   type
  // );
  //console.log(person);


  const person = getFormvalues(); // tách hàm 
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
          <button 
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
  domId("labelModal").innerHTML = "chức năng";
  domId("btnThem").style.display = "none";
  domId("btnCapNhat").style.display = "none";
  domId("btnResult").style.display = "block";
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


  } else if (loai === "loai2") {
    document.getElementById("divNhanVien").style.display = "block";
    document.getElementById("divHocSinh").style.display = "none";

  } else {

    document.getElementById("divHocSinh").style.display = "none";
    document.getElementById("divNhanVien").style.display = "none";
    domId("footerTinhKQ").innerHTML=" <p>chưa có chức năng loại đối tượng này &#128524;</p>";
  }


}

domId("btnResult").onclick = () => {
  const id = domId("personID").value   // domId("personID").value = person.id;  viết rút gọn
  const name = domId("namePerson").value 
  const address = domId("adressPerson").value 
  const email = domId("email").value 
  const type = domId("type").value


  if (type === "loai1") {
    const math = domId("diemLy").value*1;
    const physicial = domId("diemToan").value*1;
    const chemistry = domId("diemHoa").value*1;
    const student = new Student(id, name, address, email, type, math, physicial, chemistry);

    const tinhDTB = student.tinhDTB();
    console.log(tinhDTB);


    domId("footerTinhKQ").innerHTML = tinhDTB +" điểm";
  } else if (type === "loai2") {
    const datework= domId("datework").value*1;
    const salary=domId("salary").value*1;

    const employee = new Employee(id, name, address, email, type, datework, salary);
    const tinhLuong =employee.tinhLuong();

    var vietnam = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
  });
    domId("footerTinhKQ").innerHTML = vietnam.format(tinhLuong);
  }



}

window.openUpdateModal = (personId) => {
  //console.log(id);

  domId("labelModal").innerHTML = "Sửa người dùng";
  domId("btnThem").style.display = "none";
  domId("btnCapNhat").style.display = "block";
  const person = listPerson.findById(personId);

  const { id, name, address, email, type } = person; // bóc tách phần tử ra khỏi const person

  domId("personID").value = id;   // domId("personID").value = person.id;  viết rút gọn
  domId("personID").disabled = true;
  domId("namePerson").value = name;
  domId("adressPerson").value = address;
  domId("email").value = email;
  domId("type").value = type;


}




domId("btnCapNhat").onclick = () => {
  const person = getFormvalues();
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

}

const saveData = () => {//dùng gọi lại 
  setLocalStorage();
  renderTable();

}

window.deletePerson = (id) => {
  console.log(id);
  listPerson.delete(id);
  //saveData();
  setLocalStorage();//lưu
  renderTable();
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

domId("type").onchange = () => {
  var loai = document.getElementById("type").value;

  if (loai === "loai1") {
    //Do something
    document.getElementById("divHocSinh").style.display = "block";
    document.getElementById("divNhanVien").style.display = "none";


  } else if (loai === "loai2") {
    document.getElementById("divNhanVien").style.display = "block";
    document.getElementById("divHocSinh").style.display = "none";

  }
  else {

    document.getElementById("divHocSinh").style.display = "none";
    document.getElementById("divNhanVien").style.display = "none";
    domId("footerTinhKQ").innerHTML="<p>chưa có chức năng loại đối tượng này &#128524;</p>";
  }
}
