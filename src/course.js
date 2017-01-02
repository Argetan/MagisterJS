import _ from 'lodash'
import MagisterThing from './magisterThing'
import Grade from './grade'
import { parseDate } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class Course extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type String
		 * @readonly
		 */
		this.id = raw.Id.toString()

		/**
		 * @type Date
		 * @readonly
		 */
		this.start = parseDate(raw.Start)
		/**
		 * @type Date
		 * @readonly
		 */
		this.end = parseDate(raw.Einde)

		/**
		 * The school year of this course, e.g: '1617'
		 * @type String
		 * @readonly
		 */
		this.schoolPeriod = raw.Lesperiode

		/**
		 * Basic type information of this course, e.g: { description: "VWO 6", id: 420 }
		 * @type Object
		 * @readonly
		 */
		this.type = {
			id: raw.Studie.Id,
			description: raw.Studie.Omschrijving,
		}

		/**
		 * The group of this course, e.g: { description: "Klas 6v3", id: 420, locationId: 0 }
		 * @type Object
		 * @readonly
		 */
		this.group = {
			id: raw.Groep.Id,
			description: (function () {
				const group = raw.Groep.Omschrijving
				if (group != null) {
					return group.split(' ').find(w => /\d/.test(w)) || group
				}
			})(),
			locationId: raw.Groep.LocatieId,
		}

		/**
		 * @type String[]
		 * @readonly
		 */
		this.curricula = [ raw.Profiel ]
		if (raw.Profiel2 != null) {
			this.curricula.push(raw.Profiel2)
		}
	}

	/**
	 * @type Boolean
	 * @readonly
	 */
	get current() {
		const now = new Date()
		return this.start <= now && now <= this.end
	}

	/**
	 * @param {Boolean} [fillGrades=true]
	 * @return {Promise<Grade[]>}
	 */
	grades(fillGrades = true) {
		const urlPrefix = `${this._magister._personUrl}/aanmeldingen/${this.id}/cijfers`
		const url = `${urlPrefix}/cijferoverzichtvooraanmelding?actievePerioden=false&alleenBerekendeKolommen=false&alleenPTAKolommen=false`

		return this._magister._privileges.needs('cijfers', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(res => {
			res = _.reject(res, raw => raw.CijferId === 0)

			const promises = res.map(raw => {
				const grade = new Grade(this._magister, raw)
				// REVIEW
				grade.columnUrl = `${urlPrefix}/extracijferkolominfo/${_.get(raw, 'CijferKolom.Id')}`
				return Promise.resolve(fillGrades ? grade.fill() : grade)
			})

			return Promise.all(promises)
		})
		.then(r => _.sortBy(r, 'dateFilledIn'))
	}
}

export default Course