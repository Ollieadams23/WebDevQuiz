// Question Amount make buttons active
$('#amount10').click(function() {
    $('#amount10').addClass('active');
    $('#amount20').removeClass('active');
    let questionCount = 10;
    
});

$('#amount20').click(function() {
    $('#amount20').addClass('active');
    $('#amount10').removeClass('active');
    let questionCount = 20;
    
});

