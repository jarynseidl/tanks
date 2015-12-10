var GetStarted = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Getting Started</h1>
           		<p>
                    Once you have registered and logged in, you will be able to upload tanks that you have programmed
                    and battle them against other users. Here is an example of the tank interface you will need to implement.   
                    <a href="/downloads/tanks/wait.java" download> Sitting Duck Tank</a>. For more information, visit our <a href="">wiki page</a>. 
            	</p>
                <p>
                    Feel like you need to know more Java in order to participate? Click <a href="https://www.codecademy.com/learn/learn-java">here</a> to take a free crash course
                    in Java programming. 
                </p>
            </div>
            );
    }
});

module.exports = GetStarted;