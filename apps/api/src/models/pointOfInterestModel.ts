import {
    BelongsToGetAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    DeletedAt,
} from '@sequelize/core/decorators-legacy';
import { World } from './worldModel';

export class PointOfInterest extends Model<
    InferAttributes<PointOfInterest>,
    InferCreationAttributes<PointOfInterest>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.TEXT)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare x: number;

    @Attribute(DataTypes.INTEGER)
    declare y: number | null;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare z: number;

    @Attribute(DataTypes.TEXT)
    declare notes: string | null;

    @Attribute(DataTypes.ENUM('overworld', 'nether', 'end'))
    @NotNull
    declare dimension: string;

    @Attribute(DataTypes.DATE)
    declare pinnedAt: Date | null;

    @DeletedAt
    declare deletedAt: Date | null;

    @Attribute(DataTypes.INTEGER)
    declare worldId: ForeignKey<World['id']>;
    declare getWorld: BelongsToGetAssociationMixin<World>;
}
