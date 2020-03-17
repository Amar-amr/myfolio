// var imgS = document.getElementById('statusStory');
// imgS.innerHTML = '<a class="pops-up-toggle"><img id="" src="images/blog/pro-blog.png" class="thumbnail-blog" title="Amar Lal" /></a>';
// imgS.onclick = function() {
//     setTimeout(function() {
//         if ($('#statusStory').length > 0) {
//             $('#statusStory').remove();
//         }
//     }, 5000);
//     return false;
// };




var imgS = document.getElementsByClassName('item');
$("#storySlider").prepend('<div class="item"><a class="pops-up-toggle"><img id="" src="images/blog/pro-blog.png" class="thumbnail-blog" title="Amar Lal" /></a></div>');
imgS.onClick = function() {
    setTimeout(function() {
        if ($('.item').length > 0) {
            $('.item').remove();
        }
    }, 5000);
};
// .children(':first').remove(5000).fadeOut(100);