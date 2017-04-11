var OlaMundo = React.createClass({
    render: function(){
        return(
            <h1>Olá, Mundo!</h1>
        );
    }
});

ReactDOM.render(
    <OlaMundo />,
    document.getElementById('ola-mundo')
);
