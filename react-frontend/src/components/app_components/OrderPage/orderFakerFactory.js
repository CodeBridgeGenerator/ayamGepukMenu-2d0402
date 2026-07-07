
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
receiptNumber: faker.lorem.sentence(1),
dateTime: faker.lorem.sentence(1),
itemsOrdered: faker.lorem.sentence(1),
total: faker.lorem.sentence(1),
paymentMethod: faker.lorem.sentence(1),
type: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
