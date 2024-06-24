//Navbar with active item
$(function() {
    function setActiveNavItem() {
        var path = window.location.pathname; 
        var currentPage = path.split("/").pop();
        $(".nav-item a").removeClass("active");
        
        $(".nav-item a").each(function() {
            var href = $(this).attr("href");
            if (href && currentPage === href.split("/").pop()) {
                $(this).addClass("active");
            }
        });
    }

    $("#navbar-placeholder").load("navbar.html", function() {
        setActiveNavItem();
        checkLanguage();
    });
});

//Footer
$(function(){
        $("#footer-placeholder").load("footer.html", function(){checkLanguage()});
});

//back button
$(".hBack").on("click", function(e){
    e.preventDefault();
    window.history.back();
});