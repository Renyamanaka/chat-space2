$(function(){
  // $('.SettingGroupForm__rightField').on('keyup', function(e){
  //   e.preventDefault()
  //   console.log("test")
  // });
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-list__message" data-message-id=${message.id}>
          <div class="chat-message">
            <div class="chat-message__name">
              ${message.user_name}
            </div>
            <div class="chat-message__daytime">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-list__message" data-message-id=${message.id}>
        <div class="chat-message">
          <div class="chat-message__name">
            ${message.user_name}
          </div>
          <div class="chat-message__daytime">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);      
      $('.Form__submit').prop('disabled', false);
      $('Form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false)
  });
  });
});