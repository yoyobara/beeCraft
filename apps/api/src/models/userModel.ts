import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    Unique,
    NotNull,
} from '@sequelize/core/decorators-legacy';

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare email: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare fullName: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare passwordHash: string;
}
