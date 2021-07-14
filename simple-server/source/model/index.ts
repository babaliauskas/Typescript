import { DataTypes, Model } from 'sequelize';
import db from '../config/database/database.config';
import { v4 as uuidv4 } from 'uuid';

interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    completedAt: string;
}

export class TodoInstance extends Model<ITodo> {}

const now = new Date().toISOString();
const id = uuidv4();

TodoInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: id
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: now
        },
        completedAt: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: db,
        tableName: 'todos'
    }
);
