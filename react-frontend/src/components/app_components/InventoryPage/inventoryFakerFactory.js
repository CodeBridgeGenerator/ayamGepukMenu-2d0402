
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
stockNo: faker.lorem.sentence(1),
itemName: faker.lorem.sentence(1),
currentStock: faker.lorem.sentence(1),
unit: faker.lorem.sentence(1),
reorderLevel: faker.lorem.sentence(1),
supplier: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
