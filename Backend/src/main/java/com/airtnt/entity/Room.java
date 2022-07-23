package com.airtnt.entity;

import com.airtnt.airtntapp.room.dto.PostAddRoomDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "rooms")
public class Room extends BaseEntity {

	@Builder
	public Room(
			Integer id, String name, Set<Image> images, String thumbnail, byte rating,
			Address address, int bedroomCount, int bathroomCount,
			int accomodatesCount, int bedCount, Currency currency,
			Category category, String description, Set<Amentity> amentities, float latitude, float longitude,
			float price, RoomPrivacy privacyType, User host,
			Set<Rule> rules, boolean status) {
		super(status);
		this.name = name;
		this.images = images;
		this.thumbnail = thumbnail;
		this.rating = rating;
		this.address = address;
		this.bedroomCount = bedroomCount;
		this.bathroomCount = bathroomCount;
		this.accomodatesCount = accomodatesCount;
		this.bedCount = bedCount;
		this.currency = currency;
		this.category = category;
		this.description = description;
		this.amentities = amentities;
		this.latitude = latitude;
		this.longitude = longitude;
		this.price = price;
		this.privacyType = privacyType;
		this.host = host;
		this.rules = rules;
	}

	public Room(int id) {
		super(id);
	}

	@Column(nullable = false, length = 512)
	private String name;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "room_id")
	private Set<Image> images = new HashSet<>();

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

	private String thumbnail;

	@Column(columnDefinition = "smallint")
	private byte rating;

	@Column(nullable = false, columnDefinition = "SMALLINT DEFAULT 0")
	private int bedroomCount;

	@Column(nullable = false, columnDefinition = "SMALLINT DEFAULT 0")
	private int bathroomCount;

	@Column(nullable = false, columnDefinition = "SMALLINT DEFAULT 0")
	private int accomodatesCount;

	@Column(nullable = false, columnDefinition = "SMALLINT DEFAULT 0")
	private int bedCount;

	@OneToOne
	@JoinColumn(name = "currency_id")
	private Currency currency;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@Column(columnDefinition = "TEXT NOT NULL")
	private String description;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "rooms_amentities", joinColumns = @JoinColumn(name = "room_id"), inverseJoinColumns = @JoinColumn(name = "amentity_id"))
	private Set<Amentity> amentities = new HashSet<>();

	@Column(columnDefinition = "DEFAULT 0")
	private float latitude;

	@Column(columnDefinition = "DEFAULT 0")
	private float longitude;

	@Column(nullable = false)
	private float price;

	@ManyToOne
	@JoinColumn(name = "room_privacy_id")
	private RoomPrivacy privacyType;

	@JsonBackReference
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "host_id")
	private User host;

	@JsonIgnore
	@OneToMany(mappedBy = "room", cascade = CascadeType.REMOVE)
	private List<Booking> bookings;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "rooms_rules", joinColumns = @JoinColumn(name = "room_id"), inverseJoinColumns = @JoinColumn(name = "rule_id"))
	private Set<Rule> rules = new HashSet<>();

	@Transient
	public String renderThumbnailImage() {
		if (this.host.getEmail().equals("test@gmail.com")) {
			return "/room_images/" + this.host.getEmail() + "/" + this.thumbnail;
		}
		else {
			return "/room_images/" + this.host.getEmail() + "/" + this.getId() + "/" + this.thumbnail;
		}
	}

	@Transient
	public static Room buildRoom(PostAddRoomDTO payload, Set<Image> images, Set<Amentity> amenities,
			Address address, Set<Rule> rules, boolean status) {
		return Room.builder().name(payload.getName()).accomodatesCount(payload.getAccomodatesCount())
				.bathroomCount(payload.getBathroomCount()).bedCount(payload.getBedCount())
				.bedroomCount(payload.getBedroomCount()).description(payload.getDescription()).amentities(amenities)
				.images(images).latitude(payload.getLatitude()).longitude(payload.getLongitude())
				.price(payload.getPrice()).rules(rules).host(new User(payload.getHost()))
				.host(new User(payload.getHost())).category(new Category(payload.getCategory()))
				.currency(new Currency(payload.getCurrency())).privacyType(new RoomPrivacy(payload.getPrivacyType()))
				.thumbnail(images.iterator().next().getImage()).status(status).build();
	}

	@Transient
	public long calculateHowManyDaysFromPastToCurrent() {
		SimpleDateFormat df1 = new SimpleDateFormat("yyyy");
		SimpleDateFormat df2 = new SimpleDateFormat("MM");
		SimpleDateFormat df3 = new SimpleDateFormat("dd");

		String year = df1.format(this.getUpdatedDate());
		String month = df2.format(this.getUpdatedDate());
		String day = df3.format(this.getUpdatedDate());

		LocalDate dateBefore = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
		LocalDate currentdate = LocalDate.now();
		LocalDate dateAfter = LocalDate.of(currentdate.getYear(), currentdate.getMonth(), currentdate.getDayOfMonth());
		return ChronoUnit.DAYS.between(dateBefore, dateAfter);
	}
}
