package com.airtnt.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bookings")
public class Booking extends BaseEntity {
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date checkinDate;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date checkoutDate;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDateTime bookingDate;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDateTime cancelDate;

	@Builder.Default
	@Column(columnDefinition = "boolean default false")
	private boolean isRefund = false;

	@Column(columnDefinition = "Decimal(20,2) default '0.00'")
	private float refundPaid;

	@Column(columnDefinition = "Decimal(20,2)", nullable = false)
	private float siteFee;

	@Column(columnDefinition = "Decimal(20,2)", nullable = false)
	private float cleanFee;

	private boolean isComplete; // 3 state: pending success cancelled

	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false)
	private User customer;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "room_id", nullable = false)
	private Room room;

	@OneToOne(mappedBy = "booking")
	private Review review;

	private String clientMessage;

	@Transient
	long lastUpdated;

	@Transient
	public long getNumberOfDays() {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDate = LocalDate.parse(this.checkinDate.toString().split(" ")[0], dtf);
		LocalDate endDate = LocalDate.parse(this.checkoutDate.toString().split(" ")[0], dtf);

		return ChronoUnit.DAYS.between(startDate, endDate);
	}

	@Transient
	public float getPricePerDay() {
		return this.getRoom().getPrice();
	}

	@Getter(AccessLevel.NONE)
	@Setter(AccessLevel.NONE)
	@Transient
	private float totalFee;
	
	@Transient
	public void setTotalFee() {
		this.totalFee = this.getPricePerDay() * this.getNumberOfDays() + this.getSiteFee() + this.getCleanFee();
	}

	@Transient
	public float getTotalFee() {
		return this.totalFee;
	}

	public Booking(Integer bookingId) {
		super(bookingId);
	}
}
