import { Student } from "../models/student.js";


const domId = (id) => document.getElementById(id);

domId("btnDTB").onclick = () => {
  const physicial = domId("diemLy").value;
  const math = domId("diemToan").value;
  const chemistry = domId("diemHoa").value;


  const student = new Student( math, physicial, chemistry,DTB);

  const tinhDTB = student.tinhDTB();
  console.log(tinhDTB);


  domId("footerTinhDTB").innerHTML = tinhDTB;
};

