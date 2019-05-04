import React from 'react';
import { ChatMessage } from './ChatMessage';

export class ChatMessageHistory extends React.Component {
   render() {
      var createMessage = function (message, index) {
         var liStyles = {
            backgroundColor: (index % 2 === 1) ? '#ddd' : '#efefef',
            padding: '1rem',
            borderBottom: '1px solid #ddd',
            width: '100%'
         };

         return <li style={liStyles}><ChatMessage message={message.text} timestamp={message.username} /></li>
      };

      var ulStyles = {
         listStyle: 'none',
         margin: 0,
         padding: 0,
         width: '100%'
      };

      return <ul style={ulStyles}>{this.props.messages.map(createMessage)}</ul>;
   }
}