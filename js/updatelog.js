const endpoint = 'https://api.github.com/repos/yamaoka-kitaguchi-lab/spring-workshop/commits?path=spring-workshop';
const max_logs = 5;

$('#builderror').empty();
$('#builderror')
  .append('GitHub API経由で直近のコミットを取得しています...')

$.getJSON(endpoint)
.done((data) => {
  for (var i=0; i < Math.min(max_logs, data.length); i++) {
    const sha = data[i]['sha'].substring(0, 7);
    const date = new Date(data[i]['commit']['author']['date']);
    const author = data[i]['commit']['author']['name'];
    const message = data[i]['commit']['message'].split('\n')[0];
    const html_url = data[i]['html_url'];
    $('#github_commit_log')
      .append($('<li>')
        .append($('<span>').addClass('mr-2')
          .text(date.toLocaleString('en',{
            hour12:false,
            year:'2-digit',
            month:'2-digit',
            day:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
          })))
        .append($('<br>').addClass('d-sm-none'))
        .append($('<span>')
          .append($('<strong>').text(message))
          .append(" (")
          .append($('<a>').addClass('text-muted').attr('href', html_url).text(sha))
          .append(") ")
          .append($('<br>').addClass('d-sm-none'))
          .append($('<i>').text('by ' + author))))
  }
  $('#builderror').remove();
})
.fail((jqxhr, textStatus, error) => {
  console.log(jqxhr, textStatus, error);
  $('#builderror').empty();
  $('#builderror')
    .append($('<strong>').text('ビルドエラー: '))
    .append('コンソール出力を確認してください');
});
