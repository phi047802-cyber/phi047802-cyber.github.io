$(document).ready(function() {
    function getCurrentDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        $('#submitTime').text(date +" "+ time);
    }

    
    getCurrentDateTime();


    const dsTieuChi= [
            "Khả năng truyền đạt", "Thái độ giảng viên", "Sự tương tác với sinh viên", 
            "Kiến thức chuyên môn", "Tổ chức bài giảng", "Khả năng giải đáp thắc mắc", 
            "Sự nhiệt tình", "Thời gian giảng dạy phù hợp", "Thái độ đối với câu hỏi của sinh viên", 
            "Ứng dụng công nghệ trong giảng dạy", "Khả năng khuyến khích tư duy sáng tạo"
        ]

    const $TableBody = $('#TableBody')

    $.each(dsTieuChi,function(index, TieuChi) {
        let STTTieuChi = index + 1;
        let $tr = $('<tr>');

        $tr.append($('<tr>').text(TieuChi))

        for (let i = 1; i <= 5;i++) {
            let radioHTML =`<input type="radio" name="TieuChi${STTTieuChi}" value="${i}">`;
            $tr.append($('<td>').html(radioHTML));
        }

        $TableBody.append($tr);
    });

    function calculateAverage() {
            let DiemTong = 0;
            let ODaCheck = 0;

            for (let i = 1; i <= 11; i++) {
                // Lấy radio button đang được check của tiêu chí i
                let $checkedRadio = $(`input[name="TieuChi${i}"]:checked`);
                
                // Nếu có độ dài > 0 tức là đã được chọn
                if ($checkedRadio.length > 0) {
                    DiemTong += parseInt($checkedRadio.val());
                    ODaCheck++;
                }
            }

            if (ODaCheck === 11) {
                let average = (DiemTong / 11).toFixed(2);
                $('#DTB').text(`Trung bình điểm của giảng viên: ${average}`);
                return average;
            } else {
                $('#DTB').text(`Trung bình điểm của giảng viên: Chưa hoàn thành đánh giá`);
                return null;
            }
        }

        // Bắt sự kiện 'change' khi người dùng click vào bất kỳ ô radio nào
        // Dùng event delegation để bắt chính xác các phần tử sinh ra động
    $('#TableBody').on('change', 'input[type="radio"]', calculateAverage);


        $('#SubmitButton').on('click', function() {
            // Gom dữ liệu vào Object
            const surveyData = {
                courseName: $('#addSubject').val(),
                teacherName: $('#addTeacher').val(),
                studentName: $('#addStudent').val(),
                submitTime: $('#submitTime').text(),
                criteria: {}
            };

            // Lấy điểm của 11 tiêu chí
            for (let i = 1; i <= 11; i++) {
                let $checkedRadio = $(`input[name="TieuChi${i}"]:checked`);
                surveyData.criteria[`Tiêu chí ${i}`] = $checkedRadio.length > 0 ? $checkedRadio.val() : "Chưa đánh giá";
            }

            const avgScore = calculateAverage();
            surveyData.averageScore = avgScore !== null ? avgScore : "Chưa hoàn thành đánh giá";

            // Dùng JSON.stringify để chuyển Object sang chuỗi JSON và hiển thị
            $('#JsonOutput')
                .text(JSON.stringify(surveyData, null, 4))
                .show(); // Hàm .show() của jQuery tương đương display: block
        });

        // Gọi hàm hiển thị thời gian ngay khi DOM ready
        getCurrentDateTime(); 
});