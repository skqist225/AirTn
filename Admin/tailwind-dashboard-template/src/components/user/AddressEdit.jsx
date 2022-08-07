import React from "react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DropDown from "../../utils/DropDown";
import FormGroup from "../../utils/FormGroup";
import $ from "jquery";
import { fetchStatesByCountry } from "../../features/address/stateSlice";
import { fetchCountries } from "../../features/address/countrySlice";
import { fetchCitiesByState } from "../../features/address/citySlice";

const AddressEdit = ({
    register,
    address,
    countryDefaultValue,
    stateDefaultValue,
    cityDefaultValue,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchStatesByCountry({ countryId: countryDefaultValue }));
    }, [countryDefaultValue]);

    useEffect(() => {
        dispatch(fetchCitiesByState({ stateId: stateDefaultValue }));
    }, [stateDefaultValue]);

    const { countries, loading: countryLoading } = useSelector(state => state.country);
    const { states, loading: stateLoading } = useSelector(state => state.state);
    const { cities } = useSelector(state => state.city);

    const countryOptions = countries.map(country => ({
        value: country.id.toString(),
        displayText: country.name,
    }));

    const stateOptions = states.map(state => ({
        value: state.id.toString(),
        displayText: state.name,
    }));

    const cityOptions = cities.map(city => ({
        value: city.id.toString(),
        displayText: city.name,
    }));

    useEffect(() => {
        if (!countryLoading) {
            $("#countrySelect").on("change", function () {
                const countryId = parseInt($(this).children("option:selected").val());

                if (countryDefaultValue && countryId !== countryDefaultValue) {
                    dispatch(fetchStatesByCountry({ countryId: countryDefaultValue }));
                }
            });
        }
    }, [countryLoading]);

    useEffect(() => {
        if (!stateLoading) {
            $("#stateSelect").on("change", function () {
                const stateId = parseInt($(this).children("option:selected").val());

                if (stateDefaultValue && stateId !== stateDefaultValue) {
                    dispatch(fetchCitiesByState({ stateId: stateDefaultValue }));
                }
            });
        }
    }, [stateLoading]);

    return (
        <div>
            {address.country && (
                <input type='hidden' value={address.country.name} id='userCountryName' />
            )}
            {address.state && <input type='hidden' value={address.state.name} id='userStateName' />}
            <div>
                <DropDown
                    register={register}
                    id='countrySelect'
                    fieldName='country'
                    label='Country/Area'
                    options={countryOptions}
                    defaultValue={countryDefaultValue.toString()}
                />
            </div>
            <div>
                <DropDown
                    register={register}
                    id='stateSelect'
                    fieldName='state'
                    label='Tỉnh/thành phố'
                    options={stateOptions}
                    defaultValue={stateDefaultValue.toString()}
                />
                <div id='stateNameDivCode'></div>
            </div>
            <div>
                <DropDown
                    register={register}
                    id='citySelect'
                    fieldName='city'
                    label='Quận/huyện'
                    options={cityOptions}
                    defaultValue={cityDefaultValue.toString()}
                />
                <div id='cityNameDivCode'></div>
            </div>
            <FormGroup
                fieldName='aprtNoAndStreet'
                placeholder='Tên/số nhà + đường/phố'
                register={register}
                label='Địa chỉ đường/phố'
                type='text'
                value={address.aprtNoAndStreet}
            />
        </div>
    );
};

export default AddressEdit;
