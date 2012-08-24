var {{variable_name}} = {
  element_id: "{{variable_name}}",
  widgetToggle: function() {
    element = document.getElementById({{variable_name}}.element_id);
    element.style.visibility = (element.style.visibility == "visible") ? "hidden" : "visible";
  },
  toHtml: function() {
    var html = {{variable_name}}.createButton();
    var link = document.createElement('link');
    link.setAttribute("rel", "stylesheet");
    //link.setAttribute("href", 'http://{{host}}{{"/style/askbot-modal.css"|media}}');
    link.setAttribute("href", 'http://{{host}}{%url render_ask_widget_css widget.id%}');

    //creating the div
    var motherDiv = document.createElement('div');
    motherDiv.setAttribute("id", {{variable_name}}.element_id);
    console.log(motherDiv);

    var containerDiv = document.createElement('div');
    motherDiv.appendChild(containerDiv);

    {%if widget.outer_style %}
    outerStyle = document.createElement('style');
    outerStyle.innerText = "{{widget.outer_style}}";
    motherDiv.appendChild(outerStyle);
    {%endif%}

    var closeButton = document.createElement('a');
    closeButton.setAttribute('href', '#');
    closeButton.setAttribute('id', 'AskbotModalClose');
    closeButton.setAttribute('onClick', '{{variable_name}}.widgetToggle();');
    closeButton.innerText = 'Close';

    containerDiv.appendChild(closeButton);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'http://{{host}}{% url ask_by_widget widget.id %}');

    containerDiv.appendChild(iframe);

    var body = document.getElementsByTagName('body')[0];
    if (body){
      console.log(body.firstChild);
      body.insertBefore(motherDiv, body.firstChild);
      body.insertBefore(link, body.firstChild);
    }
  },
  createButton: function() {
    var label="{{widget.title}}"; //TODO: add to the model
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id', "AskbotAskButton");

    var closeButton = document.createElement('button');
    closeButton.setAttribute('onClick', '{{variable_name}}.widgetToggle();');
    closeButton.innerText = label;

    buttonDiv.appendChild(closeButton);
    
    return buttonDiv;
  }
};

previous_function = window.onload;
var onload_functions = function(){
  if (previous_function){
    previous_function();
  }
  {{variable_name}}.toHtml();
}

console.log(onload_functions);
window.onload = onload_functions();
document.write({{variable_name}}.createButton().outerHTML);