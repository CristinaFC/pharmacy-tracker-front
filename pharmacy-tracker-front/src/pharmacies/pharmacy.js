
class Pharmacy {
    constructor(address, city, location, owner, phone, eClosing, eOpening, mClosing,mOpening, nPharmacy){
        this.address = address;
        this.city = city;
        this.location = location;
        this.owner = owner;
        this.phone = phone;
        this.eClosing = eClosing;
        this.eOpening = eOpening;
        this.mClosing = mClosing;
        this.mOpening = mOpening;
        this.nPharmacy = nPharmacy;
    }

}

export const pharmacyConverter = {
    toFirestore: (pharmacies) => {
        return {
            Address: pharmacies.address,
            City: pharmacies.city,
            Location: pharmacies.location,
            Owner: pharmacies.owner,
            Phone: pharmacies.phone,
            eClosing: pharmacies.eClosing,
            eOpening: pharmacies.eOpening,
            mClosing: pharmacies.mClosing,
            mOpening: pharmacies.mOpening,
            nPharmacy: pharmacies.nPharmacy,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Pharmacy(data.Address, data.City, data.Location, data.Owner, data.Phone, data.eClosing, data.eOpening, data.mClosing, data.mOpening, data.nPharmacy);
    }
};

export default Pharmacy;