package com.airtnt.airtntapp.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Message {
	private String sender;
	private String receiver;
	private String message;
//	private String date;
//	private Status status;
}
