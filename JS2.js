$(document).ready(function(){
    let dsGia = {
        "0": 20000,
        "1": 18000,
        "2": 17000,
        "3": 19000,
        "4": 15000,
        "5": 12000,
        "6": 15000,
        "7": 12000,
        "8": 15000,
        "9": 13000,
        "10": 12000,
        "11": 14000,
        "12": 13000,
        "13": 17000,
    }

    function addTable(TenMonAn,Tien){
        let $Tbody = $('#DataTable tbody')
        let HangMoi = `<tr>
            <td>${TenMonAn}</td>
            <td>${Tien}</td>
        </tr>`

        $Tbody.append(HangMoi);
    }

$('.ChonMonAn').on('mousedown', 'option', function(e) {
    e.preventDefault();
    $(this).prop('selected', !$(this).prop('selected'));
    
    return false;
});

    function CheckSangToi() {
        let select = $('input[name="thoigian"]:checked').val();
        return select || "Sang";
    }
    function TinhTong() {
        // Lấy danh sách các thẻ <option> đang được chọn thực tế
        let $selectedOptions = $('.ChonMonAn option:selected');
        let temp = CheckSangToi();
        let Tong = 0;

        console.log("Số món đã chọn:", $selectedOptions.length);
        // Xóa sạch bảng cũ trước khi thêm mới để tránh bị lặp dữ liệu
        $('#DataTable tbody').empty();

        // Duyệt qua từng thẻ option đã chọn
        $selectedOptions.each(function() {
            let idMon = $(this).val();   // Lấy value (ví dụ: "0")
            let tenMon = $(this).text(); // Lấy chữ (ví dụ: "Bún bò")
            let giaMon = dsGia[idMon];   // Tra giá từ Object
            if (temp == "Toi") giaMon = giaMon*1.1;

            Tong += giaMon;
            addTable(tenMon, giaMon); // Thêm vào bảng ngay trong vòng lặp
        });

        
        $('#x').html(`<b>${Tong}</b>`);

    }

    // Gán sự kiện cho nút Chốt
    $('#Chot').on('click', function(){
        TinhTong();
    });
});