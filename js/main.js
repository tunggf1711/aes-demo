let input = document.getElementById("inputValue");
let outPut = document.getElementById("outPut");
let outPutValue = document.getElementById("outPutValue");
let changeButton = document.getElementById("changeButton");
let btnConfirm = document.getElementById("btnConfirm");
let statusAES = "encryptStatus";
let outPutContainer = document.getElementById("outPutContainer");

var aSide = new AES.Crypto(AES.generateKey());
var bSide = new AES.Crypto(aSide.key);
bSide.setCounter(aSide.getCounter());

const changeStatus = () => {
  if (statusAES === "encryptStatus") {
    statusAES = "decryptStatus";
  } else if (statusAES === "decryptStatus") {
    statusAES = "encryptStatus";
  }
  outPutValue.innerHTML = "";
  input.value = "";
  outPutContainer.style.display = "none";
  main();
};

changeButton.addEventListener("click", () => {
  changeStatus();
});

btnConfirm.addEventListener("click", () => {
  if (input.value === "") {
    alert("Không để trống");
    return;
  }
  if (statusAES === "encryptStatus") {
    var cipherText = aSide.encrypt(input.value);
    outPutValue.innerHTML = cipherText;
  } else if (statusAES === "decryptStatus") {
    var plainText = bSide.decrypt(input.value);
    outPutValue.innerHTML = plainText;
  }
  outPutContainer.style.display = "block";
});

const main = () => {
  if (statusAES === "decryptStatus") {
    input.placeholder = "Nhập từ cần giải mã";
    btnConfirm.innerHTML = "Giải Mã";
    btnConfirm.className = "btn btn-success";
    outPut.innerHTML = "Từ sau khi giải mã là: ";
    outPut.className = "text-success";
  } else if (statusAES === "encryptStatus") {
    input.placeholder = "Nhập từ cần mã hoá";
    btnConfirm.innerHTML = "Mã Hoá";
    btnConfirm.className = "btn btn-danger";
    outPut.innerHTML = "Từ sau khi mã hoá là: ";
    outPut.className = "text-danger";
  }
};

main();
