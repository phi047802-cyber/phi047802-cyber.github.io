let userIndex=0;

function addUser() {
    const UserName= $('#addUserName').val();
    const UserAddress= $('#addUserAddress').val();

    const UserInfo = {
        name: UserName,
        address: UserAddress
    };
    //Lưu thông tin người dùng nhập trong form vào biến tạm, tạo một Object chứa thông tin vừa nhập

    const UserInfoJSON= JSON.stringify(UserInfo);
    //Sử dụng JSON để lưu toàn bộ thông tin dưới dạng chuỗi dễ vận chuyển

    addToTable (UserName,UserAddress,UserInfoJSON); //Gọi hàm tạo thêm hàng dữ liệu vào bảng

    $('#addUserName').val('');
    $('#addUserAddress').val('');
    //Xóa dữ liệu đã thêm ở trong form, sẵn sàng nhập dữ liệu mới.
}

function addToTable (UserName, UserAddress, UserInfoJSON) {
    userIndex++;
    //Thêm mới một dòng vào bảng, STT dòng tiếp theo bằng STT dòng trước + 1

    const table = $('#UserTable tbody');
    const newRow = `<tr>
    <td>${userIndex}</td>
    <td>${UserName}</td>
    <td>${UserAddress}</td>
    <td>${UserInfoJSON}</td>
    <td><input type="checkbox" class="deleteCheckbox" onchange="toggleDeleteInput()"></td> 
    </tr>`
    //onchange để chạy câu lện toggleDeleteInput khi người dùng đã tích vào ô xóa (vô hiệu hóa xóa bằng STT)
    table.append(newRow);
    //thêm dòng mới tạo vào bảng
}

function deleteUser() {
    const checkboxes = $('.deleteCheckbox'); // lấy toàn bộ checkbox
    let anyChecked = false;//biến bool mặc định chưa có checkbox nào được check

    for (let i = checkboxes.length-1; i >= 0; i--) {//for ngược theo số lượng checkbox để xóa dòng khỏi bảng dữ liệu
        if (checkboxes[i].checked) { //nếu checkbox ở thứ tự thứ i đã được check
            anyChecked = true;//đã có checkbox được check
            $(checkboxes[i]).closest('tr').remove(); //xóa dòng có checkbox ở vị trí thứ i
            userIndex--;//giảm số lượng user
        }
    }
    

    if (!anyChecked) {//nếu không check vào checkbox
        const deleteIndex = document.querySelector('#deleteUser').value;//lấy giá trị số trong form để lấy STT muốn xóa

        if (deleteIndex.trim()==="" || isNaN(deleteIndex) || deleteIndex <=0 || deleteIndex > userIndex) {//loại trừ các giá trị nhập không hợp lệ
            alert ("Vui lòng nhập chỉ số hợp lệ.");
            return;
        }

        userIndex--;//giảm số lượng user

        $('#UserTable tbody tr').eq(deleteIndex-1).remove();//tìm vị trí hợp lệ
    }
    toggleDeleteInput();
    updateRowIndexes();
}

function updateRowIndexes() {
    $('#UserTable tbody tr').each(function(index) {
        console.log(index);
        $(this).find('td:first').text(index + 1);
        }
    );
}

function toggleDeleteInput() {
  const checkboxes = $('.deleteCheckbox');
  let anyChecked = false;

  checkboxes.each(function() {
    if ($(this).is(':checked')) {
      anyChecked = true;
    }
  });

  $('#deleteUser').prop('disabled', anyChecked);
}

// Gắn sự kiện vào nút Lưu và nút Xóa khi DOM đã sẵn sàng
$(document).ready(function() {
  $('#AddButton').on('click', addUser);
  $('#DeleteButton').on('click', deleteUser);

  $('#userData').on('keydown', function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành động mặc định của Enter (gửi form)
      addUser(); // Gọi hàm lưu thông tin
    }
  });
});