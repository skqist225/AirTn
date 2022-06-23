package com.airtnt.airtntapp.aadmin.stats;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminStatsRegisterDTO{
	private Integer month;
	private Integer year;
	private BigInteger registerCount;
}
