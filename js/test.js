//Если null - значит тест закончен
if (!localStorage.getItem('currQuest'))
  window.location.href = "http://localhost/jekyll/metrology/_site/tests";

//Все вопросы и ответы
var quests = [
{% for quest in page.quests %}
  [
  {% for item in quest %}
    [" {{ item }} "],
  {% endfor %}
  ],
{% endfor %}
];
$(document).ready(function() {
  //Таймер
  var time = {{ page.time }};
  //localStorage.setItem('timeLast', "0:03");
  //Время или из кеша, или изначальное
  var timer2 = localStorage.getItem('timeLast') || time + ":0";

  var interval = setInterval(function() {
    var timer = timer2.split(':');          
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    if (minutes < 0) clearInterval(interval);
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    $(".testing-time span").html(minutes + ':' + seconds);
    timer2 = minutes + ':' + seconds;

    //Закончилось время - закончить тест
    if (minutes == 0 && seconds == 0) endTest();
    localStorage.setItem('timeLast', timer2);
  }, 1000);


  //Номер текущего вопроса
  var curr = localStorage.getItem('currQuest') || 0;
  //Кол-во верных ответов
  var rightAns =  localStorage.getItem('rightAns') || 0;
  localStorage.setItem('rightAns', rightAns);

  //Получение данных о вопросе и вывод
  function getQuest() {
    localStorage.setItem('currQuest', curr);
    $(".testing-num span").html(localStorage.getItem('currQuest')-0+1);

    //Название вопроса
    var title = quests[curr].shift();
    $(".quest-title").html(title);

    //Ответы на текущий вопрос
    var answers = quests[curr].pop();
    localStorage.setItem('answers', answers);

    var res = "";
    //Перебор всех вариантов ответов на вопрос
    for (var i = 0; i < quests[curr].length; i++) {
      res += "<input type='checkbox' class='test-answer' id='a"+i+"' value='"+(i+1)+"'><label for='a"+i+"'>"+quests[curr][i]+"</label>";
    }
    $(".testing-answers").html(res);
    res = "";
  }

  //Конец теста
  function endTest() {
    $(".testing-res").html("Конец теста. Правильных ответов: "+localStorage.getItem('rightAns'));
    localStorage.removeItem('currQuest');
    localStorage.removeItem('timeLast');
    localStorage.removeItem('rightAns');
  }

  getQuest();

  //Следующий вопрос
  $(document).on("click", ".testing-next", function() {

    //Проверка выбранных ответов
    var right = 0,
        wrong = 0;

    for (var i = 0; i < $(".test-answer:checked").length; i++)
      if (localStorage.getItem('answers').match($(".test-answer:checked").eq(i).val())) right++;
      else {
        right = 0;
        break;
      }

    if (right == $.trim(localStorage.getItem('answers')).length) localStorage.setItem('rightAns', ++rightAns);

    curr++;
    if (curr+1 > quests.length) {
      endTest();
      return;
    }

    localStorage.setItem('currQuest', curr);
    getQuest();
  });
});