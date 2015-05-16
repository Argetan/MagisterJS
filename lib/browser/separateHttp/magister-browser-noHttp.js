/* Magister.js (browser version) by simplyApps. Built on: 16-05-2015 12:30 UTC */
(function() {
  var findQueries, messageFolder, root, _, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = (_ref = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref : this;


  /**
   * An appointment.
   *
   * @class Appointment
   * @private
   * @param _magisterObj {Magister} A Magister object this Appointment is child of.
   * @constructor
   */

  root.Appointment = (function() {
    function Appointment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * @property beginBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.beginBySchoolHour = root._getset("_beginBySchoolHour");

      /**
      		 * @property endBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.endBySchoolHour = root._getset("_endBySchoolHour");

      /**
      		 * @property fullDay
      		 * @final
      		 * @type Boolean
       */
      this.fullDay = root._getset("_fullDay");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property location
      		 * @final
      		 * @type String
       */
      this.location = root._getset("_location");

      /**
      		 * @property status
      		 * @final
      		 * @type Number
       */
      this.status = root._getset("_status");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property displayType
      		 * @final
      		 * @type Number
       */
      this.displayType = root._getset("_displayType");

      /**
      		 * @property content
      		 * @final
      		 * @type String
       */
      this.content = root._getset("_content", null, function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/\n{2,}/g, "\n").replace(/&amp;/ig, "&").trim();
        } else {
          return "";
        }
      });

      /**
      		 * @property infoType
      		 * @final
      		 * @type Number
       */
      this.infoType = root._getset("_infoType");

      /**
      		 * infoType parsed as a string.
      		 * @property infoTypeString
      		 * @final
      		 * @type String
       */
      this.infoTypeString = root._getset("_infoType", null, function(x) {
        switch (x) {
          case 0:
            return "none";
          case 1:
            return "homework";
          case 2:
            return "test";
          case 3:
            return "exam";
          case 4:
            return "quiz";
          case 5:
            return "oral test";
          case 6:
            return "information";
          default:
            return "unknown";
        }
      });

      /**
      		 * @property notes
      		 * @final
      		 * @type String
       */
      this.notes = root._getset("_notes");

      /**
      		 * @property isDone
      		 * @type Boolean
       */
      this.isDone = root._getset("_isDone", (function(_this) {
        return function(d) {
          if (_this._isDone === d) {
            return;
          }
          _this._isDone = d;
          return _this._magisterObj.http.put(_this.url(), _this._toMagisterStyle(), {}, (function() {}));
        };
      })(this));

      /**
      		 * @property classes
      		 * @final
      		 * @type String[]
       */
      this.classes = root._getset("_classes");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = root._getset("_teachers");

      /**
      		 * @property classRooms
      		 * @final
      		 * @type String[]
       */
      this.classRooms = root._getset("_classRooms");

      /**
      		 * @property groups
      		 * @final
      		 * @type String[]
       */
      this.groups = root._getset("_groups");

      /**
      		 * @property appointmentId
      		 * @final
      		 * @type Number
       */
      this.appointmentId = root._getset("_appointmentId");

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = root._getset("_attachments");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = root._getset("_url");

      /**
      		 * @property scrapped
      		 * @final
      		 * @type Boolean
       */
      this.scrapped = root._getset("_scrapped");

      /**
      		 * @property absenceInfo
      		 * @final
      		 * @type Object
       */
      this.absenceInfo = root._getset("_absenceInfo");
    }

    Appointment.prototype._toMagisterStyle = function() {
      var c, obj, p, _ref1;
      obj = {};
      obj.Id = this._id;
      obj.Start = root._helpers.toUtcString(this._begin);
      obj.Einde = root._helpers.toUtcString(this._end);
      obj.LesuurVan = this._beginBySchoolHour;
      obj.LesuurTotMet = this._endBySchoolHour;
      obj.DuurtHeleDag = this._fullDay;
      obj.Omschrijving = this._description;
      obj.Lokatie = this._location;
      obj.Status = this._status;
      obj.Type = this._type;
      obj.WeergaveType = this._displayType;
      obj.Inhoud = this._content;
      obj.InfoType = this._infoType;
      obj.Aantekening = this._notes;
      obj.Afgerond = this._isDone;
      obj.Lokalen = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._classRooms;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Docenten = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._teachers;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          p = _ref1[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.Vakken = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._classes;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Groepen = this._groups;
      obj.OpdrachtId = this._appointmentId;
      obj.Bijlagen = (_ref1 = this._attachments) != null ? _ref1 : [];
      return obj;
    };

    Appointment.prototype._makeStorable = function() {
      return _.omit(this, "_magisterObj");
    };

    Appointment._convertRaw = function(magisterObj, raw) {
      var c, obj, p, _ref1, _ref2;
      obj = new root.Appointment(magisterObj);
      obj._id = raw.Id;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._beginBySchoolHour = raw.LesuurVan;
      obj._endBySchoolHour = raw.LesuurTotMet;
      obj._fullDay = raw.DuurtHeleDag;
      obj._description = (_ref1 = raw.Omschrijving) != null ? _ref1 : "";
      obj._location = (_ref2 = raw.Lokatie) != null ? _ref2 : "";
      obj._status = raw.Status;
      obj._type = raw.Type;
      obj._displayType = raw.WeergaveType;
      obj._content = raw.Inhoud;
      obj._infoType = raw.InfoType;
      obj._notes = raw.Aantekening;
      obj._isDone = raw.Afgerond;
      obj._classes = raw.Vakken != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Vakken;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          p = _ref3[_i];
          _results.push(root.Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : [];
      obj._classRooms = raw.Lokalen != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Lokalen;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._groups = raw.Groepen;
      obj._appointmentId = raw.OpdrachtId;
      obj._attachments = raw.Bijlagen;
      obj._url = "" + magisterObj._personUrl + "/afspraken/" + obj._id;
      obj._scrapped = raw.Status === 0;
      return obj;
    };

    Appointment._convertStored = function(magisterObj, raw) {
      var obj;
      obj = _.extend(raw, new root.Appointment(magisterObj));
      obj._magisterObj = magisterObj;
      obj._begin = new Date(Date.parse(raw._begin));
      obj._end = new Date(Date.parse(raw._end));
      return obj;
    };

    return Appointment;

  })();

  root = (_ref1 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref1 : this;


  /**
   * An Assignment.
   *
   * @class Assignment
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Assignment is child of.
   */

  root.Assignment = (function() {
    function Assignment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date
       */
      this.deadline = root._getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date
       */
      this.handedInOn = root._getset("_handedInOn");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = root._getset("_files");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = root._getset("_teachers");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date
       */
      this.markedOn = root._getset("_markedOn");

      /**
      		 * @property handInAgain
      		 * @final
      		 * @type Boolean
       */
      this.handInAgain = root._getset("_handInAgain");

      /**
      		 * @property finished
      		 * @final
      		 * @type Boolean
       */
      this.finished = root._getset("_finished");

      /**
      		 * @property canHandIn
      		 * @final
      		 * @type Boolean
       */
      this.canHandIn = root._getset("_canHandIn");
    }


    /**
    	 * Gets the versions of this Assigment.
    	 *
    	 * @method versions
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {AssignmentVersion[]} An array containing AssignmentVersions.
     */

    Assignment.prototype.versions = function(callback) {
      var id, pushResult, _i, _len, _ref2, _results;
      pushResult = root._helpers.asyncResultWaiter(this._versionIds.length, function(r) {
        return callback(null, r);
      });
      _ref2 = this._versionIds;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        id = _ref2[_i];
        _results.push(this._magisterObj.http.get("" + this._magisterObj._personUrl + "/opdrachten/versie/" + id, {}, (function(_this) {
          return function(error, result) {
            if (error != null) {
              return callback(error, null);
            } else {
              return pushResult(root.AssignmentVersion._convertRaw(_this._magisterObj, _this, JSON.parse(result.content)));
            }
          };
        })(this)));
      }
      return _results;
    };

    Assignment._convertRaw = function(magisterObj, raw) {
      var f, obj, p, v;
      obj = new root.Assignment(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._class = raw.Vak;
      obj._deadline = new Date(Date.parse(raw.InleverenVoor));
      obj._handedInOn = new Date(Date.parse(raw.IngeleverdOp));
      obj._files = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Bijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          _results.push(root.Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : void 0;
      obj._versionIds = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.VersieNavigatieItems;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          v = _ref2[_i];
          _results.push(v.Id);
        }
        return _results;
      })();
      obj._grade = raw.Beoordeling;
      obj._markedOn = new Date(Date.parse(raw.BeoordeeldOp));
      obj._handInAgain = raw.OpnieuwInleveren;
      obj._finished = raw.Afgesloten;
      obj._canHandIn = raw.MagInleveren;
      return obj;
    };

    return Assignment;

  })();


  /**
   * An (handed in) version of an Assignment.
   *
   * @class AssignmentVersion
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this AssignmentVersion is child of.
   */

  root.AssignmentVersion = (function() {
    function AssignmentVersion(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property pupilMessage
      		 * @final
      		 * @type String
       */
      this.pupilMessage = root._getset("_pupilMessage");

      /**
      		 * @property teacherNotice
      		 * @final
      		 * @type String
       */
      this.teacherNotice = root._getset("_teacherNotice");

      /**
      		 * @property handedInFiles
      		 * @final
      		 * @type File[]
       */
      this.handedInFiles = root._getset("_handedInFiles");

      /**
      		 * @property feedbackFiles
      		 * @final
      		 * @type File[]
       */
      this.feedbackFiles = root._getset("_feedbackFiles");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date
       */
      this.deadline = root._getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date
       */
      this.handedInOn = root._getset("_handedInOn");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date
       */
      this.markedOn = root._getset("_markedOn");

      /**
      		 * @property version
      		 * @final
      		 * @type Number
       */
      this.version = root._getset("_version");

      /**
      		 * @property tooLate
      		 * @final
      		 * @type Boolean
       */
      this.tooLate = root._getset("_tooLate");
    }

    AssignmentVersion._convertRaw = function(magisterObj, sender, raw) {
      var f, obj;
      obj = new root.AssignmentVersion(magisterObj);
      obj._id = raw.Id;
      obj._class = sender._class;
      obj._state = raw.Status;
      obj._pupilMessage = raw.LeerlingOpmerking;
      obj._teacherNotice = raw.DocentOpmerking;
      obj._handedInFiles = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.LeerlingBijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._feedbackFiles = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.FeedbackBijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._deadline = new Date(Date.parse(raw.InleverenVoor));
      obj._handedInOn = new Date(Date.parse(raw.IngeleverdOp));
      obj._grade = raw.Beoordeling;
      obj._markedOn = new Date(Date.parse(raw.BeoordeeldOp));
      obj._version = raw.VersieNummer;
      obj._tooLate = raw.IsTeLaat;
      return obj;
    };

    return AssignmentVersion;

  })();

  root = (_ref2 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref2 : this;


  /**
   * A Class (ex. English class)
   *
   * @class Class
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Class is child of.
   */

  root.Class = (function() {
    function Class(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property beginDate
      		 * @final
      		 * @type Date
       */
      this.beginDate = root._getset("_beginDate");

      /**
      		 * @property endDate
      		 * @final
      		 * @type Date
       */
      this.endDate = root._getset("_endDate");

      /**
      		 * @property abbreviation
      		 * @final
      		 * @type String
       */
      this.abbreviation = root._getset("_abbreviation");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = root._getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = root._getset("_classExemption");
    }

    Class._convertRaw = function(magisterObj, raw) {
      var obj, _ref3, _ref4, _ref5, _ref6;
      obj = new root.Class(magisterObj);
      obj._id = (_ref3 = raw.id) != null ? _ref3 : raw.Id;
      obj._beginDate = new Date(Date.parse(raw.begindatum));
      obj._endDate = new Date(Date.parse(raw.einddatum));
      obj._abbreviation = (_ref4 = raw.afkorting) != null ? _ref4 : raw.Afkorting;
      obj._description = (_ref5 = raw.omschrijving) != null ? _ref5 : raw.Omschrijving;
      obj._number = (_ref6 = raw.volgnr) != null ? _ref6 : raw.Volgnr;
      obj._teacher = root.Person._convertRaw(magisterObj, {
        Docentcode: raw.docent
      });
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
      return obj;
    };

    return Class;

  })();


  /**
   * A Course (like: 4 VWO E/M 14-15).
   *
   * @class Course
   * @private
   * @param _magisterObj {Magister} A Magister object this Course is child of.
   * @constructor
   */

  root.Course = (function() {
    function Course(_magisterObj) {
      this._magisterObj = _magisterObj;
      this.getOtherTutors = __bind(this.getOtherTutors, this);

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * The 'school period' of this Course (e.g: "1415").
      		 * @property schoolPeriod
      		 * @final
      		 * @type String
       */
      this.schoolPeriod = root._getset("_schoolPeriod");

      /**
      		 * Type of this Course (e.g: { description: "VWO 4", id: 420 }).
      		 * @property type
      		 * @final
      		 * @type Object
       */
      this.type = root._getset("_type");

      /**
      		 * The group of this Course contains the class the user belongs to (e.g: { description: "Klas 4v3", id: 420, locationId: 0 }).
      		 * @property group
      		 * @final
      		 * @type Object
       */
      this.group = root._getset("_group");

      /**
      		 * The 'profile' of this Course (e.g: "A-EM").
      		 * @property profile
      		 * @final
      		 * @type String
       */
      this.profile = root._getset("_profile");

      /**
      		 * An alternative profile, if it exists (e.g: "A-EM").
      		 * @property alternativeProfile
      		 * @final
      		 * @type String
       */
      this.alternativeProfile = root._getset("_alternativeProfile");
    }


    /**
    	 * Gets the classes of this Course.
    	 *
    	 * @method classes
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Class[]} An array containing the Classes.
     */

    Course.prototype.classes = function(callback) {
      return this._magisterObj.http.get(this._classesUrl, {}, (function(_this) {
        return function(error, result) {
          var c;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref3, _results;
              _ref3 = JSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                c = _ref3[_i];
                _results.push(root.Class._convertRaw(this._magisterObj, c));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the grades of this Course.
    	 *
    	 * @method grades
    	 * @async
    	 * @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param [fillGrade=true] {Boolean} Whether or not to download the full grade info should be downloaded from the server. If this is set to false some properties will be not be set or have incorrect values.
    	 * @param [onlyRecent=false] {Boolean} If true this method will only fetch the grades filled in between 7 days ago and now.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade[]} An array containing the Grades.
     */

    Course.prototype.grades = function() {
      var callback, fillGrade, fillPersons, onlyRecent, _ref3;
      _ref3 = _.filter(arguments, function(a) {
        return _.isBoolean(a);
      }), fillPersons = _ref3[0], fillGrade = _ref3[1], onlyRecent = _ref3[2];
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      if (fillPersons == null) {
        fillPersons = true;
      }
      if (fillGrade == null) {
        fillGrade = true;
      }
      if (onlyRecent == null) {
        onlyRecent = false;
      }
      return this._magisterObj.http.get((onlyRecent ? this._gradesUrlPrefix : this._gradesUrl), {}, (function(_this) {
        return function(error, result) {
          var pushResult, raw, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content).Items;
            pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
              var c, g, _i, _j, _len, _len1, _ref4, _ref5;
              _ref4 = _.uniq(r, function(g) {
                return g["class"]().id();
              }).map(function(g) {
                return g["class"]();
              });
              for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                c = _ref4[_i];
                _ref5 = _.filter(r, function(g) {
                  return g["class"]().id() === c.id();
                });
                for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
                  g = _ref5[_j];
                  g._class = c;
                }
              }
              return callback(null, _.sortBy(r, function(g) {
                return g.dateFilledIn();
              }));
            });
            _results = [];
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              raw = result[_i];
              _results.push((function(raw) {
                var g, push, _ref4;
                g = root.Grade._convertRaw(_this._magisterObj, raw);
                g._columnUrl = _this._columnUrlPrefix + ((_ref4 = raw.CijferKolom) != null ? _ref4.Id : void 0);
                push = root._helpers.asyncResultWaiter(2, function() {
                  return pushResult(g);
                });
                if (fillPersons && !onlyRecent) {
                  _this._magisterObj.getPersons(g.Docent, 3, function(e, r) {
                    if (!((e != null) || (r[0] == null))) {
                      g._teacher = r[0];
                    }
                    return push();
                  });
                } else {
                  push();
                }
                if (fillGrade && !onlyRecent) {
                  return g.fillGrade(function(e, r) {
                    if (e != null) {
                      return callback(e, null);
                    } else {
                      return push();
                    }
                  });
                } else {
                  return push();
                }
              })(raw));
            }
            return _results;
          }
        };
      })(this));
    };


    /**
    	 * Gets the perosnal tutor of the current user for this Course.
    	 *
    	 * @method getPersonalTutor
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person} The tutor as a Person object.
     */

    Course.prototype.getPersonalTutor = function(callback) {
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/aanmeldingen/" + this._id + "/mentor", {}, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, root.Person._convertRaw(_this._magisterObj, JSON.parse(result.content)));
          }
        };
      })(this));
    };


    /**
    	 * Gets the (group / class) tutors.
    	 *
    	 * @method getOtherTutors
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person} The tutor as a Person object.
     */

    Course.prototype.getOtherTutors = function(callback) {
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/aanmeldingen/" + this._id + "/mentor", {}, (function(_this) {
        return function(error, result) {
          var items, p;
          if (error != null) {
            return callback(error, null);
          } else {
            items = JSON.parse(result.content).items;
            return callback(null, (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = items.length; _i < _len; _i++) {
                p = items[_i];
                _results.push(root.Person._convertRaw(this._magisterObj, p));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    Course._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.Course(magisterObj);
      obj._classesUrl = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/vakken");
      obj._gradesUrlPrefix = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/cijfers");
      obj._gradesUrl = obj._gradesUrlPrefix + "/cijferoverzichtvooraanmelding?actievePerioden=false&alleenBerekendeKolommen=false&alleenPTAKolommen=false";
      obj._columnUrlPrefix = obj._gradesUrlPrefix + "/extracijferkolominfo/";
      obj._id = raw.Id;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._schoolPeriod = raw.Lesperiode;
      obj._type = {
        id: raw.Studie.Id,
        description: raw.Studie.Omschrijving
      };
      obj._group = {
        id: raw.Groep.Id,
        description: raw.Groep.Omschrijving,
        locationId: raw.Groep.LocatieId
      };
      obj._profile = raw.Profiel;
      obj._alternativeProfile = raw.Profiel2;
      return obj;
    };

    return Course;

  })();

  root = (_ref3 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref3 : this;


  /**
   * A Digital school utility, usually things like a gateway to an online platform of a book used by a school.
   *
   * @class DigitalSchoolUtility
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this DigitalSchoolUtility is child of.
   */

  root.DigitalSchoolUtility = (function() {
    function DigitalSchoolUtility(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property publisher
      		 * @final
      		 * @type String
       */
      this.publisher = root._getset("_publisher");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * @property EAN
      		 * @final
      		 * @type Number
       */
      this.EAN = root._getset("_EAN");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = root._getset("_url");

      /**
      		 * This should be a Class object, if no class was found this will be undefined.
      		 * @property class
      		 * @final
      		 * @type Class|undefined
       */
      this["class"] = root._getset("_class");
    }

    DigitalSchoolUtility._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.DigitalSchoolUtility(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.MateriaalType;
      obj._name = raw.Titel;
      obj._publisher = raw.Uitgeverij;
      obj._state = raw.Status;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Eind));
      obj._EAN = Number(raw.EAN);
      obj._url = raw.Url;
      obj._class = raw.Vak;
      return obj;
    };

    return DigitalSchoolUtility;

  })();

  root = (_ref4 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref4 : this;


  /**
   * A folder containing File instances.
   *
   * @class FileFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this FileFolder is child of.
   * @constructor
   */

  root.FileFolder = (function() {
    function FileFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * The rights the current user has on this FileFolder.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = root._getset("_rights");

      /**
      		 * The ID of the parent FileFolder of this FileFolder.
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = root._getset("_parentId");
    }


    /**
    	 * Gets all the files in the current FileFolder.
    	 *
    	 * @method files
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {File[]} The results as an Array.
     */

    FileFolder.prototype.files = function(callback) {
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/bronnen?parentId=" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var f, files, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            files = (function() {
              var _i, _len, _ref5, _results;
              _ref5 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
                f = _ref5[_i];
                _results.push(root.File._convertRaw(this._magisterObj, this, f));
              }
              return _results;
            }).call(_this);
            pushResult = root._helpers.asyncResultWaiter(files.length, function(r) {
              return callback(null, files);
            });
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
              f = files[_i];
              _results.push((function(f) {
                return _this._magisterObj.getPersons(f.GeplaatstDoor, function(e, r) {
                  if (!((e != null) || r.length === 0)) {
                    f._addedBy = r[0];
                  }
                  return pushResult();
                });
              })(f));
            }
            return _results;
          }
        };
      })(this));
    };

    FileFolder._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.FileFolder(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Naam;
      obj._rights = raw.Privilege;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return FileFolder;

  })();


  /**
   * A file from Magister, can be downloaded.
   *
   * @class File
   * @private
   * @param _magisterObj {Magister} A Magister object this File is child of.
   * @constructor
   */

  root.File = (function() {
    function File(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property name
      		 * @type String
       */
      this.name = root._getset("_name", (function(_this) {
        return function(x) {
          _this._name = x;
          return _this._update();
        };
      })(this));

      /**
      		 * @property uri
      		 * @final
      		 * @type String
       */
      this.uri = root._getset("_uri");

      /**
      		 * The size of this file in bytes.
      		 * @property size
      		 * @final
      		 * @type Number
       */
      this.size = root._getset("_size");

      /**
      		 * The rights the current user has on this File.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = root._getset("_rights");

      /**
      		 * @property mime
      		 * @final
      		 * @type String
       */
      this.mime = root._getset("_mime");

      /**
      		 * @property changedDate
      		 * @final
      		 * @type Date
       */
      this.changedDate = root._getset("_changedDate");

      /**
      		 * @property creationDate
      		 * @final
      		 * @type Date
       */
      this.creationDate = root._getset("_creationDate");

      /**
      		 * @property addedBy
      		 * @final
      		 * @type Person
       */
      this.addedBy = root._getset("_addedBy");

      /**
      		 * @property fileBlobId
      		 * @final
      		 * @type Number
       */
      this.fileBlobId = root._getset("_fileBlobId");

      /**
      		 * The FileFolder this File is in.
      		 * @property fileFolder
      		 * @type FileFolder
       */
      this.fileFolder = root._getset("_fileFolder", this.move);

      /**
      		 * @property uniqueId
      		 * @final
      		 * @type String
       */
      this.uniqueId = root._getset("_uniqueId");
    }


    /**
    	 * Downloads the current file
    	 * Currently only accessible from the server.
    	 *
    	 * @method download
    	 * @async
    	 * @param [downloadFile=true] {Boolean|String} Whether or not to download the file directly. If `downloadFile` is a truely string the file will be downloaded in with the name set to the string's content.
    	 * @param [callback] {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {String} A string containing the base64 encoded binary data of the downloaded file.
     */

    File.prototype.download = function() {
      var callback, downloadFile, fileName, request, _ref5;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      downloadFile = (_ref5 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref5 : true;
      request = null;
      if (typeof Meteor !== "undefined" && Meteor !== null ? Meteor.isServer : void 0) {
        request = Npm.require("request");
      } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
        request = require("request");
      } else {
        if (typeof callback === "function") {
          callback(new Error("`File.download` is only accessible from the server at the moment.\nYou can set a proxy yourself with something like iron:router serverside routes."), null);
        }
        return void 0;
      }
      fileName = (downloadFile != null ? _.isString(downloadFile) ? downloadFile : this.name() : void 0);
      return request({
        url: this._downloadUrl,
        method: "GET",
        headers: this._magisterObj.http._cookieInserter(),
        encoding: null
      }).on("error", function(err) {
        return typeof callback === "function" ? callback(err, null) : void 0;
      }).on("response", function(res) {
        return typeof callback === "function" ? callback(null, "") : void 0;
      }).pipe(require("fs").createWriteStream(fileName));
    };


    /**
    	 * Moves the current File to another FileFolder
    	 *
    	 * @method move
    	 * @param fileFolder {FileFolder|Number|String} A FileFolder, an ID of a FileFolder or (a part of) the name of a FileFolder.
     */

    File.prototype.move = function(fileFolder) {
      return this._magisterObj.fileFolders((function(_this) {
        return function(e, r) {
          if (e != null) {
            throw e;
          }
          if (!_.isObject(fileFolder)) {
            fileFolder = _.find(r, function(f) {
              return root._helpers.contains(f.name(), fileFolder, true) || f.id() === fileFolder;
            });
          }
          _this._fileFolder = fileFolder;
          return _this._update();
        };
      })(this));
    };


    /**
    	 * WARNING. Removes the current File.
    	 *
    	 * @method remove
     */

    File.prototype.remove = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/bronnen/" + (this.id()), {}, function(error, result) {
        if (error != null) {
          throw error;
        }
      });
    };


    /**
    	 * Updates the current File on the Magister servers.
    	 *
    	 * @private
    	 * @method _update
     */

    File.prototype._update = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/bronnen/" + (this.id()), this._toMagisterStyle(), {}, (function() {}));
    };

    File.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.BronSoort = this._type;
      obj.Naam = this._name;
      obj.Uri = this._uri;
      obj.Grootte = this._size;
      obj.Privilege = this._rights;
      obj.ContentType = this._mime;
      obj.FileBlobId = this._fileBlobId;
      obj.ParentId = this._fileFolder.id();
      obj.UniqueId = this._uniqueId;
      return obj;
    };

    File._convertRaw = function(magisterObj, sender, raw) {
      var addedBy, l, obj, _ref5;
      if (raw._addedBy != null) {
        addedBy = raw._addedBy;
      } else {
        addedBy = new root.Person(magisterObj, null, "", "");
        addedBy._fullName = raw.GeplaatstDoor;
      }
      obj = new root.File(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.BronSoort;
      obj._name = raw.Naam;
      obj._uri = raw.Uri;
      obj._size = raw.Grootte;
      obj._rights = raw.Privilege;
      obj._mime = raw.ContentType;
      obj._changedDate = new Date(Date.parse(raw.GewijzigdOp));
      obj._creationDate = new Date(Date.parse((_ref5 = raw.GemaaktOp) != null ? _ref5 : raw.Datum));
      obj._addedBy = addedBy;
      obj._fileBlobId = raw.FileBlobId;
      obj._fileFolder = sender;
      obj._uniqueId = raw.UniqueId;
      l = _.find(raw.Links, {
        Rel: "Contents"
      });
      if (l == null) {
        l = _.find(raw.Links, {
          Rel: "Self"
        });
      }
      obj._downloadUrl = magisterObj.magisterSchool.url + l.Href;
      return obj;
    };

    return File;

  })();

  root = (_ref5 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref5 : this;


  /**
   * A Grade (ex. 1,0)
   *
   * @class Grade
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Grade is child of.
   */

  root.Grade = (function() {
    function Grade(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property passed
      		 * @final
      		 * @type Boolean
       */
      this.passed = root._getset("_passed");

      /**
      		 * @property dateFilledIn
      		 * @final
      		 * @type Date
       */
      this.dateFilledIn = root._getset("_dateFilledIn");

      /**
      		 * @property gradePeriod
      		 * @final
      		 * @type Object
       */
      this.gradePeriod = root._getset("_gradePeriod");

      /**
      		 * @property class
      		 * @final
      		 * @type Object
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property atLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.atLaterDate = root._getset("_atLaterDate");

      /**
      		 * @property exemption
      		 * @final
      		 * @type Boolean
       */
      this.exemption = root._getset("_exemption");

      /**
      		 * @property counts
      		 * @final
      		 * @type Boolean
       */
      this.counts = root._getset("_counts");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = root._getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = root._getset("_classExemption");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property weight
      		 * @final
      		 * @type Number
       */
      this.weight = root._getset("_weight");
    }


    /**
    	 * Downloads extra info, if it's not downloaded yet and fills the current grade with it.
    	 *
    	 * @method fillGrade
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade} The current grade filled with the newely downloaded info.
     */

    Grade.prototype.fillGrade = function(callback) {
      if (!this._filled) {
        return this._magisterObj.http.get(this._columnUrl, {}, (function(_this) {
          return function(error, result) {
            if (error != null) {
              return typeof callback === "function" ? callback(error, null) : void 0;
            } else {
              result = JSON.parse(result.content);
              _this._description = result.WerkInformatieOmschrijving;
              _this._weight = result.Weging;
              _this._type._level = result.KolomNiveau;
              _this._type._description = result.KolomOmschrijving;
              _this._filled = true;
              return typeof callback === "function" ? callback(null, _this) : void 0;
            }
          };
        })(this));
      } else {
        return typeof callback === "function" ? callback(null, this) : void 0;
      }
    };

    Grade._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.Grade(magisterObj);
      obj._id = raw.CijferId;
      obj._grade = raw.CijferStr;
      obj._passed = raw.IsVoldoende;
      obj._dateFilledIn = new Date(Date.parse(raw.DatumIngevoerd));
      obj._gradePeriod = {
        id: function() {
          return raw.CijferPeriode.Id;
        },
        name: function() {
          return raw.CijferPeriode.Naam;
        }
      };
      obj._class = {
        id: function() {
          return raw.Vak.Id;
        },
        abbreviation: function() {
          return raw.Vak.Afkorting;
        },
        description: function() {
          return raw.Vak.Omschrijving;
        }
      };
      obj._atLaterDate = raw.Inhalen;
      obj._exemption = raw.Vrijstelling;
      obj._counts = raw.TeltMee;
      if (raw.CijferKolom != null) {
        obj._type = root.GradeType._convertRaw(magisterObj, raw.CijferKolom);
      }
      obj._assignmentId = raw.CijferKolomIdEloOpdracht;
      obj._teacher = root.Person._convertRaw(magisterObj, {
        Docentcode: raw.Docent
      });
      obj._teacher._type = 3;
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
      obj._description = "";
      obj._weight = 0;
      return obj;
    };

    return Grade;

  })();


  /**
   * A Type of a Grade object.
   *
   * @class GradeType
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this GradeType is child of.
   */

  root.GradeType = (function() {
    function GradeType(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property header
      		 * @final
      		 * @type String
       */
      this.header = root._getset("_header");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property isAtLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.isAtLaterDate = root._getset("_isAtLaterDate");

      /**
      		 * @property isTeacher
      		 * @final
      		 * @type Boolean
       */
      this.isTeacher = root._getset("_isTeacher");

      /**
      		 * @property hasNestedTypes
      		 * @final
      		 * @type Boolean
       */
      this.hasNestedTypes = root._getset("_hasNestedTypes");

      /**
      		 * @property isPTA
      		 * @final
      		 * @type Boolean
       */
      this.isPTA = root._getset("_isPTA");

      /**
      		 * Have no idea what this is. If anybody has an idea, tell me please so we can make this doc at least a bit useful.
      		 * @property level
      		 * @final
       */
      this.level = root._getset("_level");
    }

    GradeType._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.GradeType(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.KolomNaam;
      obj._number = raw.KolomNummer;
      obj._header = raw.KolomKop;
      obj._type = raw.KolomSoort;
      obj._isAtLaterDate = raw.IsHerkansingKolom;
      obj._isTeacher = raw.IsDocentKolom;
      obj._hasNestedTypes = raw.HeeftOndeliggendeKolommen;
      obj._isPTA = raw.IsPTAKolom;
      obj._level = null;
      obj._description = "";
      return obj;
    };

    return GradeType;

  })();

  root = (_ref6 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref6 : this;

  if (typeof Meteor !== "undefined" && Meteor !== null) {
    this._ = _ = lodash;
  } else if (((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) && (typeof require !== "undefined" && require !== null) && (typeof window === "undefined" || window === null)) {
    if (_ == null) {
      this._ = _ = require("lodash");
    }
  } else if (this._ != null) {
    _ = this;
  } else {
    throw new Error("Lo-dash is required.");
  }


  /**
   * A JavaScript implementation of the Magister 6 API.
   * @author Lieuwe Rooijakkers
   * @module Magister
   */


  /**
   * Class to communicate with Magister.
   *
   * @class Magister
   * @param magisterSchool {MagisterSchool|String} A MagisterSchool to logon to. If this is a String it will use that String as a query to search for a possible school.
   * @param username {String} The username of the user to login to.
   * @param password {String} The password of the user to login to.
   * @param [_keepLoggedIn=true] {Boolean} Whether or not to keep the user logged in.
   * @constructor
   */

  root.Magister = (function() {
    function Magister(magisterSchool, username, password, _keepLoggedIn) {
      this.magisterSchool = magisterSchool;
      this.username = username;
      this.password = password;
      this._keepLoggedIn = _keepLoggedIn != null ? _keepLoggedIn : true;
      if (!(arguments.length === 3 || arguments.length === 4)) {
        throw new Error("Expected 3 or 4 arguments, got " + arguments.length);
      }
      this._readyCallbacks = [];
      this.http = new root.MagisterHttp();
      if (_.isString(this.magisterSchool)) {
        MagisterSchool.getSchools(this.magisterSchool, (function(_this) {
          return function(e, r) {
            if (e != null) {
              throw e;
            } else if (r.length === 0) {
              throw new Error("No school with the query " + _this.magisterSchool + " found.");
            } else {
              _this.magisterSchool = r[0];
              return _this.reLogin();
            }
          };
        })(this));
      } else {
        this.reLogin();
      }
    }


    /**
    	 * Get the appoinments of the current User between the two given Dates.
    	 *
    	 * @method appointments
    	 * @async
    	 * @param from {Date} The start date for the Appointments, you won't get appointments from before this date.
    	 * @param [to] {Date} The end date for the Appointments, you won't get appointments from after this date.
    	 * @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Appointment[]} An array containing the Appointments.
     */

    Magister.prototype.appointments = function() {
      var callback, dateConvert, fillPersons, from, to, url, _ref7, _ref8;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      fillPersons = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      _ref8 = _.where(arguments, function(a) {
        return _.isDate(a);
      }), from = _ref8[0], to = _ref8[1];
      if (!_.isDate(to)) {
        to = from;
      }
      from = root._helpers.date(from);
      to = root._helpers.date(to);
      this._forceReady();
      dateConvert = root._helpers.urlDateConvert;
      url = "" + this._personUrl + "/afspraken?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from));
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var a, absenceInfo, appointments, changedAppointments, finish, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content);
            appointments = (function() {
              var _i, _len, _ref9, _results;
              _ref9 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                a = _ref9[_i];
                _results.push(root.Appointment._convertRaw(this, a));
              }
              return _results;
            }).call(_this);
            absenceInfo = [];
            changedAppointments = [];
            finish = root._helpers.asyncResultWaiter(3, function(r) {
              _.each(appointments, function(a) {
                return a._absenceInfo = _.find(absenceInfo, function(absence) {
                  return absence.appointmentId === a.id();
                });
              });
              appointments = _(appointments).reject(function(a) {
                return _.contains(changedAppointments, function(changedAppointment) {
                  return changedAppointment.id() === a.id();
                });
              }).concat(changedAppointments).filter(function(a) {
                return root._helpers.date(a.begin()) >= from && (root._helpers.date(a.end()) <= to || a.fullDay());
              }).sortBy("_begin").value();
              return callback(null, appointments);
            });
            _this.http.get("" + _this._personUrl + "/roosterwijzigingen?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              result = JSON.parse(result.content);
              changedAppointments.concat((function() {
                var _i, _len, _ref9, _results;
                _ref9 = result.Items;
                _results = [];
                for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                  a = _ref9[_i];
                  _results.push(root.Appointment._convertRaw(this, a));
                }
                return _results;
              }).call(_this));
              return finish();
            });
            _this.http.get("" + _this._personUrl + "/absenties?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              var _i, _len;
              result = JSON.parse(result.content).Items;
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                a = result[_i];
                absenceInfo.push({
                  id: a.Id,
                  begin: new Date(Date.parse(a.Start)),
                  end: new Date(Date.parse(a.Eind)),
                  schoolHour: a.Lesuur,
                  permitted: a.Geoorloofd,
                  appointmentId: a.AfspraakId,
                  description: root._helpers.trim(a.Omschrijving),
                  type: a.VerantwoordingType,
                  code: a.Code
                });
              }
              return finish();
            });
            if (fillPersons) {
              pushResult = root._helpers.asyncResultWaiter(appointments.length, finish);
              _results = [];
              for (_i = 0, _len = appointments.length; _i < _len; _i++) {
                a = appointments[_i];
                _results.push((function(a) {
                  var teachers, _ref9;
                  teachers = (_ref9 = a.teachers()) != null ? _ref9 : [];
                  return _this.fillPersons(teachers, (function(e, r) {
                    a._teachers = r;
                    return pushResult();
                  }), 3);
                })(a));
              }
              return _results;
            } else {
              return finish();
            }
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @param [query] {String} A case insensetive query the MessageFolder need to match.
    	 * @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
    	 *	@param [callback.error] {null} Will always be null
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]} An array containing the matching messageFolders.
     */

    Magister.prototype.messageFolders = function(query, callback) {
      var result;
      if (callback == null) {
        callback = function() {};
      }
      this._forceReady();
      if (_.isString(query) && query !== "") {
        result = _.where(this._messageFolders, function(mF) {
          return root._helpers.contains(mF.name(), query, true);
        });
      } else {
        result = this._messageFolders;
      }
      callback(null, result);
      return result;
    };


    /**
    	 * @method inbox
    	 * @return {MessageFolder} The inbox of the current user.
     */

    Magister.prototype.inbox = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("postvak in", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method sentItems
    	 * @return {MessageFolder} The sent items folder of the current user.
     */

    Magister.prototype.sentItems = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("verzonden items", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method bin
    	 * @return {MessageFolder} The bin of the current user.
     */

    Magister.prototype.bin = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("verwijderde items", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method alerts
    	 * @return {MessageFolder} The alerts folder of the current user.
     */

    Magister.prototype.alerts = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("mededelingen", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * Gets the courses of the current User.
    	 *
    	 * @method courses
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Course[]} An array containing the Courses.
     */

    Magister.prototype.courses = function(callback) {
      var url;
      this._forceReady();
      url = "" + this._personUrl + "/aanmeldingen";
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var c;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content);
            return callback(null, _.sortBy((function() {
              var _i, _len, _ref7, _results;
              _ref7 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                c = _ref7[_i];
                _results.push(root.Course._convertRaw(this, c));
              }
              return _results;
            }).call(_this), function(c) {
              return c.begin();
            }).reverse());
          }
        };
      })(this));
    };


    /**
    	 * Gets limited course info for the current Course for the current User.
    	 *
    	 * This is quicker than `courses`, however it's not as consistent and
    	 * doesn't really fit in Magister.js's style, however if you know what
    	 * you're doing and you're willing to use this, go ahead.
    	 *
    	 * @method getLimitedCurrentCourseInfo
    	 * @async
    	 * @deprecated `courses` is prefered.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Object} The limited course info.
     */

    Magister.prototype.getLimitedCurrentCourseInfo = function(callback) {
      var url;
      this._forceReady();
      url = "" + this._personUrl + "/opleidinggegevensprofiel";
      return this.http.get(url, {}, function(error, result) {
        var parsed;
        if (error != null) {
          return callback(error, null);
        } else {
          parsed = JSON.parse(result.content);
          return callback(null, {
            group: parsed.Klas,
            profile: pared.Profielen,
            pupilId: pared.StamNr,
            type: {
              year: +/\d+/.exec(Parsed.Studie)[0],
              schoolVariant: /[^\d\s]+/.exec(Parsed.Studie)[0]
            }
          });
        }
      });
    };

    Magister._cachedPersons = {};


    /**
    	 * Gets an Array of Persons that matches the given profile.
    	 *
    	 * @method getPersons
    	 * @async
    	 * @param query {String} The query the persons must match to (e.g: Surname, Name, ...). Should at least be 3 chars long.
    	 * @param [type] {String|Number} The type the person must have. If none is given it will search for both Teachers and Pupils.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person[]} An array containing the Persons.
     */

    Magister.prototype.getPersons = function() {
      var callback, query, type, url, val;
      this._forceReady();
      query = root._helpers.trim(arguments[0]);
      callback = arguments.length === 2 ? arguments[1] : arguments[2];
      if (arguments.length === 3) {
        type = arguments[1];
      }
      if (!((query != null) && (callback != null) && query.length >= 3)) {
        callback(null, []);
        return void 0;
      }
      if (type == null) {
        this.getPersons(query, 3, (function(_this) {
          return function(e, r) {
            var teachers;
            if (e != null) {
              return callback(e, null);
            } else {
              teachers = r;
              return _this.getPersons(query, 4, function(e, r) {
                if (e != null) {
                  return callback(e, null);
                } else {
                  return callback(null, root._helpers.pushMore(r, teachers));
                }
              });
            }
          };
        })(this));
        return void 0;
      }
      type = (function() {
        switch (root.Person._convertType(type)) {
          case 3:
            return "Personeel";
          case 4:
            return "Leerling";
          case 8:
            return "Project";
          default:
            return "Overig";
        }
      })();
      url = "" + this._personUrl + "/contactpersonen?contactPersoonType=" + type + "&q=" + (query.replace(/\ +/g, "+"));
      if ((val = Magister._cachedPersons["" + this._id + type + query]) != null) {
        return callback(null, val);
      } else {
        return this.http.get(url, {}, (function(_this) {
          return function(error, result) {
            var p;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref7, _results;
                _ref7 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                  p = _ref7[_i];
                  _results.push(root.Person._convertRaw(this, p));
                }
                return _results;
              }).call(_this);
              Magister._cachedPersons["" + _this._id + type + query] = result;
              return callback(null, result);
            }
          };
        })(this));
      }
    };


    /**
    	 * Fills the given person(s) by downloading the person from Magister and replacing the local instance.
    	 *
    	 * @method fillPersons
    	 * @async
    	 * @param persons {Person|Person[]} A Person or an Array of Persons to fetch more information for.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person|Person[]} A fetched person or an array containing the fetched Persons, according to the type of the given persons parameter.
    	 * @param [overwriteType] {Number|String} Not recommended. Forces the type used to search the persons for.
     */

    Magister.prototype.fillPersons = function(persons, callback, overwriteType) {
      var p, pushResult, _i, _len, _ref7, _ref8;
      this._forceReady();
      if (_.isArray(persons)) {
        if (persons.length === 0) {
          callback(null, []);
          return void 0;
        }
        pushResult = root._helpers.asyncResultWaiter(persons.length, function(r) {
          return callback(null, r);
        });
        for (_i = 0, _len = persons.length; _i < _len; _i++) {
          p = persons[_i];
          try {
            this.getPersons(_.last(p.fullName().split(" ")), (_ref7 = p._type) != null ? _ref7 : overwriteType, function(e, r) {
              var _ref8;
              if ((e != null) || (r == null)) {
                throw e;
              } else {
                return pushResult((_ref8 = r[0]) != null ? _ref8 : p);
              }
            });
          } catch (_error) {
            pushResult(p);
          }
        }
      } else if (_.isObject(persons)) {
        try {
          this.getPersons(_.last(persons.fullName().split(" ")), (_ref8 = persons._type) != null ? _ref8 : overwriteType, function(e, r) {
            var _ref9;
            if ((e != null) || (r == null)) {
              throw e;
            } else {
              return callback(null, (_ref9 = r[0]) != null ? _ref9 : persons);
            }
          });
        } catch (_error) {
          callback(persons);
        }
      } else {
        throw new Error("Expected persons to be an Array or an Object, got a(n) " + (typeof persons));
      }
      return void 0;
    };


    /**
    	 * Shortcut for composing and sending a Message.
    	 *
    	 * @method composeAndSendMessage
    	 * @param subject {String} The subject of the message
    	 * @param [body] {String} The body of the message, if none is given the body will be empty.
    	 * @param recipients {Person[]|String[]|Person|String} The recipient(s) the message will be sent to.
     */

    Magister.prototype.composeAndSendMessage = function() {
      var body, m, recipients, subject, _ref7;
      this._forceReady();
      _ref7 = _.filter(arguments, function(a) {
        return _.isString(a);
      }), subject = _ref7[0], body = _ref7[1];
      recipients = _.last(arguments);
      if (arguments.length === 2) {
        body = "";
      }
      m = new root.Message(this);
      m.subject(subject);
      m.body(body != null ? body : "");
      m.addRecipient(recipients);
      return m.send();
    };


    /**
    	 * Gets the FileFolders of the current user.
    	 *
    	 * @method fileFolders
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {FileFolder[]} An array containing FileFolders.
     */

    Magister.prototype.fileFolders = function(callback) {
      this._forceReady();
      return this.http.get("" + this._personUrl + "/bronnen?soort=0", {}, (function(_this) {
        return function(error, result) {
          var f;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref7, _results;
              _ref7 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                f = _ref7[_i];
                _results.push(root.FileFolder._convertRaw(this, f));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the StudyGuides of the current user.
    	 *
    	 * @method studyGuides
    	 * @async
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false StudyGuide.class() will return null.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {StudyGuide[]} An array containing StudyGuides.
     */

    Magister.prototype.studyGuides = function(callback) {
      var cb, fillClass, _ref7;
      this._forceReady();
      fillClass = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._pupilUrl + "/studiewijzers?peildatum=" + (root._helpers.urlDateConvert(new Date)), {}, function(error, result) {
            var s, studyGuide, _fn, _i, _len;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref8, _results;
                _ref8 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
                  s = _ref8[_i];
                  _results.push(root.StudyGuide._convertRaw(this, s));
                }
                return _results;
              }).call(_this);
              _fn = function(studyGuide) {
                if (classes != null) {
                  return studyGuide._class = _.find(classes, function(c) {
                    return c.abbreviation() === studyGuide._class;
                  });
                } else {
                  return studyGuide._class = null;
                }
              };
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                studyGuide = result[_i];
                _fn(studyGuide);
              }
              return callback(null, result);
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
          if ((r != null) && r.length !== 0) {
            return r[0].classes(function(e, r) {
              if ((r != null) && r.length !== 0) {
                return cb(r);
              } else {
                return cb();
              }
            });
          } else {
            return cb();
          }
        });
      } else {
        return cb();
      }
    };


    /**
    	 * Gets the Assignments for the current user.
    	 *
    	 * @method assignments
    	 * @async
    	 * @param [amount=50] {Number} The amount of Assignments to fetch from the server.
    	 * @param [skip=0] {Number} The amount of Assignments to skip.
    	 * @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false Assignment.class() will return null.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Assignment[]} An array containing Assignments.
     */

    Magister.prototype.assignments = function() {
      var amount, callback, cb, fillClass, fillPersons, skip, _ref7, _ref8;
      this._forceReady();
      _ref7 = _.filter(arguments, function(a) {
        return _.isNumber(a);
      }), amount = _ref7[0], skip = _ref7[1];
      _ref8 = _.filter(arguments, function(a) {
        return _.isBoolean(a);
      }), fillPersons = _ref8[0], fillClass = _ref8[1];
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (fillPersons == null) {
        fillPersons = true;
      }
      if (fillClass == null) {
        fillClass = true;
      }
      if (amount == null) {
        amount = 50;
      }
      if (skip == null) {
        skip = 0;
      }
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._personUrl + "/opdrachten?skip=" + skip + "&top=" + amount + "&status=alle", {}, function(error, result) {
            var e, id, pushResult, _i, _len, _results;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref9, _results;
                _ref9 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                  e = _ref9[_i];
                  _results.push(e.Id);
                }
                return _results;
              })();
              pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
                return callback(null, r);
              });
              _results = [];
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                id = result[_i];
                _results.push(_this.http.get("" + _this._personUrl + "/opdrachten/" + id, {}, function(error, result) {
                  var assignment, teachers, _ref9;
                  assignment = root.Assignment._convertRaw(_this, JSON.parse(result.content));
                  if (classes != null) {
                    assignment._class = _.find(classes, function(c) {
                      return c.abbreviation() === assignment._class;
                    });
                  } else {
                    assignment._class = null;
                  }
                  if (fillPersons) {
                    teachers = (_ref9 = assignment.teachers()) != null ? _ref9 : [];
                    return _this.fillPersons(teachers, (function(e, r) {
                      assignment._teachers = r;
                      return pushResult(assignment);
                    }), 3);
                  } else {
                    return pushResult(assignment);
                  }
                }));
              }
              return _results;
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
          if ((r != null) && r.length !== 0) {
            return r[0].classes(function(e, r) {
              if ((r != null) && r.length !== 0) {
                return cb(r);
              } else {
                return cb();
              }
            });
          } else {
            return cb();
          }
        });
      } else {
        return cb();
      }
    };


    /**
    	 * Gets the Digital school utilities for the current user.
    	 *
    	 * @method digitalSchoolUtilities
    	 * @async
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false .class() will return a limited class object.
    	 * @fixme /NOT WORKING/ (Weird ID mismatch) @param [class] {Class|Number} The class or ID of a class to get the Digital school utitlities for. If none is given it will return every DigitalSchoolUtility.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {DigitalSchoolUtility[]} An array containing DigitalSchoolUtilities.
     */

    Magister.prototype.digitalSchoolUtilities = function() {
      var callback, cb, fillClass, url, _class, _ref7;
      this._forceReady();
      fillClass = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (_.isObject(_class)) {
        _class = _class.id();
      }
      url = _class != null ? "" + this._personUrl + "/lesmateriaal?vakken=" + _class : "" + this._personUrl + "/lesmateriaal";
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get(url, {}, function(error, result) {
            var u, utilities, _fn, _fn1, _i, _j, _len, _len1;
            if (error != null) {
              return callback(error, null);
            } else {
              utilities = (function() {
                var _i, _len, _ref8, _results;
                _ref8 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
                  u = _ref8[_i];
                  _results.push(root.DigitalSchoolUtility._convertRaw(this, u));
                }
                return _results;
              }).call(_this);
              if (classes != null) {
                _fn = function(u) {
                  return u._class = _.find(classes, function(c) {
                    return c.abbreviation() === u._class.Afkorting && c.description() === u._class.Omschrijving;
                  });
                };
                for (_i = 0, _len = utilities.length; _i < _len; _i++) {
                  u = utilities[_i];
                  _fn(u);
                }
              } else {
                _fn1 = function(u) {
                  return u._class = root.Class._convertRaw(_this, u._class);
                };
                for (_j = 0, _len1 = utilities.length; _j < _len1; _j++) {
                  u = utilities[_j];
                  _fn1(u);
                }
              }
              return callback(null, utilities);
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
          if ((r != null) && r.length !== 0) {
            return _.last(r).classes(function(e, r) {
              return cb(r);
            });
          }
        });
      } else {
        return cb();
      }
    };


    /**
    	 * Returns the profile for the current logged in user.
    	 *
    	 * @method profileInfo
    	 * @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
    	 *	@param [callback.error] {Null} Will always be null
    	 *	@param [callback.result] {ProfileInfo} The profile of the current logged in user.
    	 * @return {ProfileInfo} The profile of the current logged in user.
     */

    Magister.prototype.profileInfo = function(callback) {
      this._forceReady();
      if (typeof callback === "function") {
        callback(null, this._profileInfo);
      }
      return this._profileInfo;
    };


    /**
    	 * Returns the children of the current user.
    	 *
    	 * @method children
    	 * @param callback
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {ProfileInfo[]} An array containing ProfileInfo instances.
     */

    Magister.prototype.children = function(callback) {
      return this.http.get("" + this._personUrl + "/kinderen", {}, (function(_this) {
        return function(error, result) {
          var c, parsed, raw, res, _i, _len, _ref7;
          if (error != null) {
            return callback(error, null);
          } else {
            parsed = JSON.parse(result.content);
            if ((parsed.ExceptionId != null) && parsed.Reason === 1) {
              callback(_.extend(parsed, {
                message: "User is not a parent."
              }), null);
              return;
            }
            res = [];
            _ref7 = parsed.Items;
            for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
              raw = _ref7[_i];
              c = root.ProfileInfo._convertRaw(_this, c);
              c._profilePicture = "" + _this.magisterSchool.url + "/api/personen/" + raw.Id + "/foto";
              c.magister(function(callback) {
                var r;
                r = _.clone(_this);
                r._id = raw.Id;
                r._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + r._id;
                r._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + r._id;
                r._profileInfo = c;
                _this.http.get("" + r._personUrl + "/berichten/mappen", {}, function(error, result) {
                  var m;
                  r._messageFolders = (function() {
                    var _j, _len1, _ref8, _results;
                    _ref8 = JSON.parse(result.content).Items;
                    _results = [];
                    for (_j = 0, _len1 = _ref8.length; _j < _len1; _j++) {
                      m = _ref8[_j];
                      _results.push(root.MessageFolder._convertRaw(r, m));
                    }
                    return _results;
                  })();
                  return callback(r);
                });
                return void 0;
              });
              res.push(c);
            }
            return callback(null, res);
          }
        };
      })(this));
    };


    /**
    	 * Checks if this Magister instance is done logging in.
    	 *
    	 * You can also provide a callback, which will be called when this instance is done logging in.
    	 *
    	 * @method ready
    	 * @param [callback] {Function} The callback which will be called if the current instance is done logging in.
    	 * 	@param [callback.error] {Object} A error that occured when logging onto Magister, if it exists.
    	 *	@param callback.this {Magister} The current Magister object.
    	 * @return {Boolean} Whether or not the current Magister instance is done logging in.
     */

    Magister.prototype.ready = function(callback) {
      if (_.isFunction(callback)) {
        if (this._ready || (this._magisterLoadError != null)) {
          _.bind(callback, this)(this._magisterLoadError);
        } else {
          this._readyCallbacks.push(_.bind(callback, this));
        }
      }
      return this._ready === true;
    };

    Magister.prototype._forceReady = function() {
      if (!this._ready) {
        throw new Error("Not done with logging in! (use Magister.ready(callback) to be sure that logging in is done)");
      }
    };

    Magister.prototype._setReady = function() {
      var callback, _i, _len, _ref7;
      this._ready = true;
      _ref7 = this._readyCallbacks;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        callback = _ref7[_i];
        callback();
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._setErrored = function(e) {
      var callback, _i, _len, _ref7;
      this._magisterLoadError = e;
      _ref7 = this._readyCallbacks;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        callback = _ref7[_i];
        callback(this._magisterLoadError);
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._readyCallbacks = [];

    Magister.prototype._magisterLoadError = null;


    /**
    	 * (Re-)Login the current Magister instance.
    	 *
    	 * Usually not needed to call manually.
    	 *
    	 * @method reLogin
    	 * @deprecated
     */

    Magister.prototype.reLogin = function() {
      var url;
      this._ready = false;
      this._magisterLoadError = null;
      this.magisterSchool.url = this.magisterSchool.url.replace(/^https?/, "https");
      url = "" + this.magisterSchool.url + "/api/sessie";
      return this.http.post(url, {
        Gebruikersnaam: this.username,
        Wachtwoord: this.password,
        GebruikersnaamOnthouden: true,
        IngelogdBlijven: this._keepLoggedIn
      }, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return _this._setErrored(error);
          } else if (result.content != null) {
            return _this._setErrored(result.content);
          } else {
            _this._sessionId = /[a-z\d-]+/.exec(result.headers["set-cookie"][0])[0];
            _this.http._cookie = "SESSION_ID=" + _this._sessionId + "; M6UserName=" + _this.username;
            return _this.http.get("" + _this.magisterSchool.url + "/api/account", {}, function(error, result) {
              if (error != null) {
                _this._setErrored(error);
                return;
              }
              result = JSON.parse(result.content);
              _this._group = result.Groep[0];
              _this._id = result.Persoon.Id;
              _this._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + _this._id;
              _this._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + _this._id;
              _this._profileInfo = root.ProfileInfo._convertRaw(_this, result);
              return _this.http.get("" + _this._personUrl + "/berichten/mappen", {}, function(error, result) {
                var m;
                if (error != null) {
                  _this._setErrored(error);
                  return;
                }
                _this._messageFolders = (function() {
                  var _i, _len, _ref7, _results;
                  _ref7 = JSON.parse(result.content).Items;
                  _results = [];
                  for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                    m = _ref7[_i];
                    _results.push(root.MessageFolder._convertRaw(this, m));
                  }
                  return _results;
                }).call(_this);
                return _this._setReady();
              });
            });
          }
        };
      })(this));
    };

    return Magister;

  })();

  root = (_ref7 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref7 : this;

  messageFolder = function(magisterObj, x) {
    switch (x) {
      case 1:
        return magisterObj.inbox();
      case 2:
        return magisterObj.sentItems();
      case 3:
        return magisterObj.bin();
      case 4:
        return magisterObj.alerts();
      default:
        return root.MessageFolder._convertRaw({
          Id: x
        });
    }
  };


  /**
   * A Magister message.
   *
   * @class Message
   * @param _magisterObj {Magister} A Magister object this Message is child of.
   * @constructor
   */

  root.Message = (function() {
    function Message(_magisterObj) {
      this._magisterObj = _magisterObj;
      if (this._magisterObj == null) {
        throw new Error("Magister instance is null!");
      }
      this._magisterObj._forceReady();
      this._canSend = true;
      this._sender = this._magisterObj.profileInfo();
      this._recipients = [];
      this._sendDate = new Date();
      this._isRead = false;
      this._type = 1;
      this._subject = "";
      this._body = "";

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property body
      		 * @type String
      		 * @default ""
       */
      this.body = root._getset("_body", ((function(_this) {
        return function(x) {
          return _this._body = x.replace("\n", "<br>");
        };
      })(this)), function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "");
        } else {
          return "";
        }
      });

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = root._getset("_attachments");

      /**
      		 * The MessageFolder this Message in, changing this will move the Message.
      		 * @property messageFolder
      		 * @type MessageFolder
       */
      this.messageFolder = root._getset("_folderId", ((function(_this) {
        return function(x) {
          return _this.move(x);
        };
      })(this)), (function(_this) {
        return function(x) {
          return messageFolder(_this._magisterObj, x);
        };
      })(this));

      /**
      		 * @property subject
      		 * @type String
      		 * @default ""
       */
      this.subject = root._getset("_subject", (function(_this) {
        return function(x) {
          return _this._subject = x;
        };
      })(this));

      /**
      		 * @property sender
      		 * @final
      		 * @type Person
       */
      this.sender = root._getset("_sender");

      /**
      		 * @property recipients
      		 * @final
      		 * @type Person[]
      		 * @default []
       */
      this.recipients = root._getset("_recipients");

      /**
      		 * @property sendDate
      		 * @final
      		 * @type Date
      		 * @default new Date()
       */
      this.sendDate = root._getset("_sendDate");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * @property isRead
      		 * @type Boolean
      		 * @default false
       */
      this.isRead = root._getset("_isRead", (function(_this) {
        return function(x) {
          if (_this._isRead === x || _this._canSend) {
            return;
          }
          _this._isRead = x;
          return _this._update();
        };
      })(this));

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property isFlagged
      		 * @final
      		 * @type Boolean
       */
      this.isFlagged = root._getset("_isFlagged");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");
    }

    Message.prototype._tasks = 0;

    Message.prototype._sendAfterFinished = false;

    Message.prototype._working = function() {
      return this._tasks !== 0;
    };

    Message.prototype._tickDown = function() {
      if (--this._tasks === 0 && this._sendAfterFinished) {
        return this.send();
      }
    };

    Message.prototype._reset = function() {
      this._tasks = 0;
      return this._sendAfterFinished = false;
    };


    /**
    	 * Adds (a) recipient(s) to the current Message.
    	 *
    	 * @method addRecipient
    	 * @param recipient {String|Person|String[]|Person[]} The recipient(s) to add.
    	 * @param [type] {String|Number} The type of the recipient, if none is provided and recipient is a String it will search for both Teachers and Pupils.
     */

    Message.prototype.addRecipient = function(recipient, type) {
      var p, _i, _len;
      if (_.isString(recipient)) {
        this._tasks++;
        this._magisterObj.getPersons(recipient, type, (function(_this) {
          return function(e, r) {
            if (r.length !== 0) {
              _this.recipients().push(r[0]);
              return _this._tickDown();
            } else if (type != null) {
              _this._reset();
              throw new Error("Couldn't find a person with the type: \"" + type + "\" and with the query: \"" + recipient + "\"");
            } else {
              _this._reset();
              throw new Error("Couldn't find a person with the query: \"" + recipient + "\"");
            }
          };
        })(this));
      } else if (_.isArray(recipient)) {
        for (_i = 0, _len = recipient.length; _i < _len; _i++) {
          p = recipient[_i];
          this.addRecipient(p, type);
        }
      } else if (_.isObject(recipient)) {
        this.recipients().push(recipient);
      } else {
        this._reset();
        throw new Error("Expected recipient to be a String or an Object, got a(n) " + (typeof recipient));
      }
      return void 0;
    };


    /**
    	 * Creates a new Message that replies to the sender of the current Message.
    	 *
    	 * @method createReplyMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createReplyMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("RE: ") !== 0 ? "RE: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      msg._recipients = [this.sender()];
      return msg;
    };


    /**
    	 * Creates a new Message that replies to the sender and recipients of the current Message.
    	 *
    	 * @method createReplyToAllMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createReplyToAllMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("RE: ") !== 0 ? "RE: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      msg._recipients = _.reject(this.recipients(), function(x) {
        return x.id() === this._magisterObj.profileInfo().id();
      }).concat([this.sender()]);
      return msg;
    };


    /**
    	 * Creates a new Message that forwards the current Message.
    	 *
    	 * @method createForwardMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createForwardMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("FW: ") !== 0 ? "FW: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      return msg;
    };


    /**
    	 * Sends the current Message. Sending will be delayed if there are processes running in the background.
    	 *
    	 * @method send
    	 * @return {Boolean} False if the sending is delayed, otherwise true.
     */

    Message.prototype.send = function() {
      if (this._working()) {
        this._sendAfterFinished = true;
        return false;
      }
      if (!this._canSend) {
        throw new Error("This message is marked as unsendable");
      }
      if (!((this.recipients() != null) && (this.sender() != null))) {
        throw new Error("Sender and/or recipients cannot be null");
      }
      if (_.isEmpty(this.subject())) {
        throw new Error("Subject cannot be null or empty");
      }
      if (this.body() == null) {
        this.body("");
      }
      this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten", this._toMagisterStyle(), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
      return true;
    };


    /**
    	 * Move the current message to the given position.
    	 *
    	 * @method move
    	 * @param destination {Number|MessageFolder} The MessageFolder of the ID of a MessageFolder or the MessageFolder itself where to move this Message to.
     */

    Message.prototype.move = function(destination) {
      if (_.isObject(destination)) {
        destination = destination.id();
      }
      if (!_.isNumber(destination)) {
        throw new Error("Could not resolve MessageFolder form the given destination.");
      }
      if (this._folderId === destination) {
        return;
      }
      this._folderId = destination;
      return this._update();
    };


    /**
    	 * WARNING. Removes the current Message.
    	 *
    	 * @method remove
     */

    Message.prototype.remove = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/" + (this.id()), {}, function(error, result) {
        if (error != null) {
          throw error;
        }
      });
    };

    Message.prototype._update = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/berichten/" + (this.id()) + "?berichtSoort=" + (this.type()), this._toMagisterStyle(), {}, (function() {}));
    };

    Message.prototype._toMagisterStyle = function() {
      var obj, p;
      obj = {};
      obj.Id = this._id;
      obj.Inhoud = this._body;
      obj.MapId = this._folderId;
      obj.Onderwerp = this._subject;
      obj.Ontvangers = (function() {
        var _i, _len, _ref8, _results;
        _ref8 = this._recipients;
        _results = [];
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          p = _ref8[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.VerstuurdOp = this._sendDate;
      obj.Begin = this._begin;
      obj.Einde = this._end;
      obj.IsGelezen = this._isRead;
      obj.Status = this._state;
      obj.HeeftPrioriteit = this._isFlagged;
      obj.Soort = this._type;
      return obj;
    };

    Message._convertRaw = function(magisterObj, raw) {
      var o, obj, _ref8;
      obj = new root.Message(magisterObj);
      obj._id = raw.Id;
      obj._body = (_ref8 = raw.Inhoud) != null ? _ref8 : "";
      obj._folderId = raw.MapId;
      obj._subject = raw.Onderwerp;
      obj._sender = root.Person._convertRaw(magisterObj, raw.Afzender);
      obj._recipients = (function() {
        var _i, _len, _ref10, _ref9, _results;
        _ref10 = (_ref9 = raw.Ontvangers) != null ? _ref9 : [];
        _results = [];
        for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
          o = _ref10[_i];
          _results.push(root.Person._convertRaw(magisterObj, o));
        }
        return _results;
      })();
      obj._sendDate = new Date(Date.parse(raw.VerstuurdOp));
      obj._begin = new Date(Date.parse(raw.Begin));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._isRead = raw.IsGelezen;
      obj._state = raw.Status;
      obj._isFlagged = raw.HeeftPrioriteit;
      obj._type = raw.Soort;
      obj._canSend = false;
      return obj;
    };

    return Message;

  })();

  root = (_ref8 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref8 : this;

  findQueries = function(queries) {
    var final, numbers, result;
    final = "";
    if (_.any(["unread", "ongelezen"], function(x) {
      return root._helpers.contains(queries, x, true);
    })) {
      final += "&gelezen=false";
    } else if (_.any(["read", "gelezen"], function(x) {
      return root._helpers.contains(queries, x, true);
    })) {
      final += "&gelezen=true";
    }
    if ((result = /(skip \d+)|(sla \d+ over)/ig.exec(queries)) != null) {
      numbers = /\d+/.exec(result[0])[0];
      final += "&skip=" + numbers;
    }
    return final;
  };


  /**
   * A MessageFolder.
   *
   * @class MessageFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this MessageFolder is child of.
   * @constructor
   */

  root.MessageFolder = (function() {
    function MessageFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property unreadMessagesCount
      		 * @final
      		 * @type Number
       */
      this.unreadMessagesCount = root._getset("_unreadMessagesCount");

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = root._getset("_parentId");
    }


    /**
    	 * Gets the Messages of this MessageFolder.
    	 *
    	 * @method messages
    	 * @async
    	 * @param [limit=10] {Number} The limit of the amount of Messages to fetch.
    	 * @param [queries=""] {String} Queries to do on the message (e.g: "unread, skip 5")
    	 * @param [download=true] {Boolean} Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Message[]} An array containing the Messages.
     */

    MessageFolder.prototype.messages = function() {
      var callback, download, limit, queries, url, _ref10, _ref11, _ref9;
      limit = (_ref9 = _.find(arguments, function(a) {
        return _.isNumber(a);
      })) != null ? _ref9 : 10;
      queries = (_ref10 = _.find(arguments, function(a) {
        return _.isString(a);
      })) != null ? _ref10 : "";
      download = (_ref11 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref11 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback is null");
      }
      if (limit === 0) {
        callback(null, []);
        return void 0;
      }
      url = "" + this._magisterObj._personUrl + "/berichten?mapId=" + (this.id()) + "&top=" + limit + (findQueries(queries));
      return this._magisterObj.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var m, messages, pushMessage, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            messages = (function() {
              var _i, _len, _ref12, _results;
              _ref12 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
                m = _ref12[_i];
                _results.push(root.Message._convertRaw(this._magisterObj, m));
              }
              return _results;
            }).call(_this);
            pushMessage = root._helpers.asyncResultWaiter(messages.length, function(r) {
              return callback(null, _.sortBy(r, function(m) {
                return m.sendDate();
              }).reverse());
            });
            _results = [];
            for (_i = 0, _len = messages.length; _i < _len; _i++) {
              m = messages[_i];
              _results.push((function(m) {
                url = "" + _this._magisterObj._personUrl + "/berichten/" + (m.id()) + "?berichtSoort=" + (m.type());
                return _this._magisterObj.http.get(url, {}, function(error, result) {
                  var a, parsed, pushPeople;
                  parsed = JSON.parse(result.content);
                  m._body = parsed.Inhoud;
                  m._attachments = (function() {
                    var _j, _len1, _ref12, _ref13, _results1;
                    _ref13 = (_ref12 = parsed.Bijlagen) != null ? _ref12 : [];
                    _results1 = [];
                    for (_j = 0, _len1 = _ref13.length; _j < _len1; _j++) {
                      a = _ref13[_j];
                      _results1.push(root.File._convertRaw(this._magisterObj, void 0, a));
                    }
                    return _results1;
                  }).call(_this);
                  if (download) {
                    pushPeople = root._helpers.asyncResultWaiter(m.recipients().length + 1, function() {
                      return pushMessage(m);
                    });
                    _this._magisterObj.fillPersons(m.recipients(), function(e, r) {
                      m._recipients = r;
                      return pushPeople(r);
                    });
                    return _this._magisterObj.fillPersons(m.sender(), function(e, r) {
                      m._sender = r;
                      return pushPeople(r);
                    });
                  } else {
                    return pushMessage(m);
                  }
                });
              })(m));
            }
            return _results;
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders in this MessageFolder that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @async
    	 * @param query {String} A case insensetive query the MessageFolder need to match.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]} An array containing the matching messageFolders.
     */

    MessageFolder.prototype.messageFolders = function(query, callback) {
      var _ref9;
      callback = (_ref9 = (callback != null ? callback : query)) != null ? _ref9 : (function() {});
      if (callback == null) {
        return;
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/berichten/mappen?parentId=" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var mF, messageFolders;
          if (error != null) {
            return callback(error, null);
          } else {
            messageFolders = (function() {
              var _i, _len, _ref10, _results;
              _ref10 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
                mF = _ref10[_i];
                _results.push(root.MessageFolder._convertRaw(this._magisterObj, mF));
              }
              return _results;
            }).call(_this);
            if (_.isString(query) && query !== "") {
              result = _.where(messageFolders, function(mF) {
                return Helpers.contains(mF.name(), query, true);
              });
            } else {
              result = messageFolders;
            }
            return callback(null, result);
          }
        };
      })(this));
    };


    /**
    	 * DANGER. Removes ALL messages from the current MessageFolder.
    	 * @method removeAllMessages
     */

    MessageFolder.prototype.removeAllMessages = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/map/" + (this.id()), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
    };


    /**
    	 * Creates a new MessageFolder inside of this MessageFolder with the given name.
    	 *
    	 * @method createMessageFolder
    	 * @async
    	 * @param name {String} The name of the MessageFolder.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder} The new MessageFolder.
     */

    MessageFolder.prototype.createMessageFolder = function(name, callback) {
      var folder;
      if (callback == null) {
        callback = function() {};
      }
      folder = {
        naam: name,
        parentId: this.id(),
        persoonId: this._magisterObj._id
      };
      return this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten/mappen", folder, {}, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, root.MessageFolder._convertRaw(_this._magisterObj, JSON.parse(result.content)));
          }
        };
      })(this));
    };


    /**
    	 * DANGER. Removes the current MessageFolder.
    	 * @method remove
     */

    MessageFolder.prototype.remove = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/berichten/mappen", this._toMagisterStyle(), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
    };

    MessageFolder.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Naam = this._name;
      obj.OngelezenBerichten = this._unreadMessagesCount;
      obj.Id = this._id;
      obj.ParentId = this._parentId;
      return obj;
    };

    MessageFolder._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.MessageFolder(magisterObj);
      obj._name = raw.Naam;
      obj._unreadMessagesCount = raw.OngelezenBerichten;
      obj._id = raw.Id;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return MessageFolder;

  })();

  root = (_ref9 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref9 : this;


  /**
   * A Person.
   *
   * @class Person
   * @private
   * @param _magisterObj {Magister} A Magister object this Person is child of.
   * @param _type {Number|String} The type of the Person.
   * @param _firstName {String} The first name of the Person.
   * @param _lastName {String} The last name of the Person.
   * @constructor
   */

  root.Person = (function() {
    function Person(_magisterObj, _type, _firstName, _lastName) {
      this._magisterObj = _magisterObj;
      this._type = _type;
      this._firstName = _firstName;
      this._lastName = _lastName;
      if ((this._firstName != null) && (this._lastName != null)) {
        if (_.any(_.toArray(arguments).slice(2), function(a) {
          return (a != null) && !_.isString(a);
        })) {
          throw new Error("One or more arguments is not a string.");
        }
      }

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @type String
       */
      this.type = root._getset("_type", ((function(_this) {
        return function(val) {
          return _this._type = Person._convertType(val, true);
        };
      })(this)), Person._convertType);

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = root._getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = root._getset("_lastName");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = root._getset("_namePrefix");

      /**
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = root._getset("_fullName");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property group
      		 * @final
      		 * @type String
       */
      this.group = root._getset("_group");

      /**
      		 * @property teacherCode
      		 * @final
      		 * @type String
       */
      this.teacherCode = root._getset("_teacherCode");

      /**
      		 * @property emailAddress
      		 * @final
      		 * @type String
       */
      this.emailAddress = root._getset("_emailAddress");
    }

    Person.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.Type = this._type;
      obj.Voornaam = this._firstName;
      obj.Achternaam = this._lastName;
      obj.Tussenvoegsel = this._namePrefix;
      obj.Naam = this._fullName;
      obj.Omschrijving = this._description;
      obj.Groep = this._group;
      obj.Docentcode = this._teacherCode;
      obj.Emailadres = this._emailAddress;
      return obj;
    };

    Person._convertRaw = function(magisterObj, raw) {
      var obj, _ref10, _ref11;
      obj = new root.Person(magisterObj, raw.Type, raw.Voornaam, raw.Achternaam);
      obj._id = raw.Id;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._fullName = raw.Naam;
      obj._description = (_ref10 = (_ref11 = raw.Omschrijving) != null ? _ref11 : raw.Naam) != null ? _ref10 : raw.naam;
      obj._group = raw.Groep;
      obj._teacherCode = raw.Docentcode;
      obj._emailAddress = raw.Emailadres;
      return obj;
    };

    Person._convertType = function(original, setter) {
      if (setter == null) {
        setter = true;
      }
      if (setter) {
        if (_.isNumber(original)) {
          if (!_.contains([1, 3, 4, 8], original)) {
            throw new Error("Invalid value: \"" + original + "\".");
          }
          return original;
        } else {
          switch (original.toLowerCase()) {
            case "group":
              return 1;
            case "teacher" || "personnel":
              return 3;
            case "pupil":
              return 4;
            case "project":
              return 8;
            default:
              throw new Error("Invalid value: \"" + original + "\".");
          }
        }
      } else {
        switch (original) {
          case 1:
            return "group";
          case 3:
            return "teacher";
          case 4:
            return "pupil";
          case 8:
            return "project";
          default:
            return void 0;
        }
      }
    };

    return Person;

  })();

  root = (_ref10 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref10 : this;


  /**
   * Information of the logged in user. Or a child.
   *
   * @class ProfileInfo
   * @private
   * @param _magisterObj {Magister} A Magister object this ProfileInfo is child of.
   * @param _firstName {String} The first name of the user.
   * @param _lastName {String} The last name of the user.
   * @param _birthDate {Date} The date of birth of the user.
   * @constructor
   */

  root.ProfileInfo = (function() {
    function ProfileInfo(_magisterObj, _firstName, _lastName, _birthDate) {
      this._magisterObj = _magisterObj;
      this._firstName = _firstName;
      this._lastName = _lastName;
      this._birthDate = _birthDate;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property officialFirstNames
      		 * @final
      		 * @type String
       */
      this.officialFirstNames = root._getset("_officialFirstNames");

      /**
      		 * @property initials
      		 * @final
      		 * @type String
       */
      this.initials = root._getset("_initials");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = root._getset("_namePrefix");

      /**
      		 * @property officialSurname
      		 * @final
      		 * @type String
       */
      this.officialSurname = root._getset("_officialSurname");

      /**
      		 * @property birthSurname
      		 * @final
      		 * @type String
       */
      this.birthSurname = root._getset("_birthSurname");

      /**
      		 * @property birthNamePrefix
      		 * @final
      		 * @type String
       */
      this.birthNamePrefix = root._getset("_birthNamePrefix");

      /**
      		 * @property useBirthname
      		 * @final
      		 * @type Boolean
       */
      this.useBirthname = root._getset("_useBirthname");

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = root._getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = root._getset("_lastName");

      /**
      		 * Equal to firstName() + " " + lastName()
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = function() {
        return this.firstName() + " " + this.lastName();
      };

      /**
      		 * @property birthDate
      		 * @final
      		 * @type Date
       */
      this.birthDate = root._getset("_birthDate");
    }


    /**
    	 * The profile picture of the current User.
    	 *
    	 * @method profilePicture
    	 * @param [width=640] The width of the picture.
    	 * @param [height=640] The height of the picture.
    	 * @param [crop=false] Whether or not to crop the image.
    	 * @return {String} The URL to the picture, including the given options.
     */

    ProfileInfo.prototype.profilePicture = function(width, height, crop) {
      if (width == null) {
        width = 640;
      }
      if (height == null) {
        height = 640;
      }
      if (crop == null) {
        crop = false;
      }
      return "" + this._magisterObj._personUrl + "/foto?width=" + width + "&height=" + height + "&crop=" + crop;
    };


    /**
    	 * Fetch more detailedInfo of the current User.
    	 *
    	 * @method detailedInfo
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {DetailedProfileInfo} The detailed profile info of the current User.
     */

    ProfileInfo.prototype.detailedInfo = function(callback) {
      var push;
      if (callback == null) {
        throw new Error("`callback` is required.");
      }
      push = root._helpers.asyncResultWaiter(2, function(r) {
        return callback(null, root.DetailedProfileInfo._convertRaw(_.extend(r[0], r[1])));
      });
      this._magisterObj.http.get("" + this._magisterObj._personUrl + "/profiel", {}, function(e, r) {
        if (e != null) {
          return callback(e, null);
        } else {
          return push(JSON.parse(r.content));
        }
      });
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/adresprofiel", {}, function(e, r) {
        if (e != null) {
          return callback(e, null);
        } else {
          return push(JSON.parse(r.content));
        }
      });
    };

    ProfileInfo._convertRaw = function(magisterObj, raw) {
      var obj;
      raw = raw.Persoon;
      obj = new root.ProfileInfo(magisterObj, raw.Roepnaam, raw.Achternaam, new Date(Date.parse(raw.Geboortedatum)));
      obj._id = raw.Id;
      obj._officialFirstNames = raw.OfficieleVoornamen;
      obj._initials = raw.Voorletters;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._officialSurname = raw.OfficieleAchternaam;
      obj._birthSurname = raw.GeboorteAchternaam;
      obj._birthNamePrefix = raw.GeboortenaamTussenvoegsel;
      obj._useBirthname = raw.GebruikGeboortenaam;
      return obj;
    };

    return ProfileInfo;

  })();


  /**
   * More detailed information of the logged in user. Or a child.
   *
   * @class DetailedProfileInfo
   * @private
   * @constructor
   */

  root.DetailedProfileInfo = (function() {
    function DetailedProfileInfo() {

      /**
      		 * @property redirectMagisterMessages
      		 * @final
      		 * @type Boolean
       */
      this.redirectMagisterMessages = root._getset("_redirectMagisterMessages");

      /**
      		 * @property emailAddress
      		 * @final
      		 * @type String
       */
      this.emailAddress = root._getset("_emailAddress");

      /**
      		 * @property mobileNumber
      		 * @final
      		 * @type String
       */
      this.mobileNumber = root._getset("_mobileNumber");

      /**
      		 * @property postalCode
      		 * @final
      		 * @type String
       */
      this.postalCode = root._getset("_postalCode");

      /**
      		 * @property street
      		 * @final
      		 * @type String
       */
      this.street = root._getset("_street");

      /**
      		 * @property houseNumber
      		 * @final
      		 * @type Number
       */
      this.houseNumber = root._getset("_houseNumber");

      /**
      		 * String behind the `houseNumber` (eg 'A')
      		 *
      		 * @property suffix
      		 * @final
      		 * @type String
       */
      this.suffix = root._getset("_suffix");

      /**
      		 * @property city
      		 * @final
      		 * @type String
       */
      this.city = root._getset("_city");
    }

    DetailedProfileInfo._convertRaw = function() {
      var obj, raw;
      raw = arguments[arguments.length === 2 ? 1 : 0];
      obj = new root.DetailedProfileInfo;
      obj._redirectMagisterMessages = raw.EloBerichtenDoorsturen;
      obj._emailAddress = raw.EmailAdres;
      obj._mobileNumber = raw.Mobiel;
      obj._postalCode = raw.Postcode;
      obj._street = raw.Straatnaam;
      obj._houseNumber = raw.Huisnummer;
      obj._suffix = raw.Toevoeging;
      obj._city = raw.Woonplaats;
      return obj;
    };

    return DetailedProfileInfo;

  })();

  root = (_ref11 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref11 : this;


  /**
   * A Magister school.
   *
   * @class MagisterSchool
   * @param name {String} The name of the school.
   * @param url {String} The URL of the school.
   * @constructor
   */

  root.MagisterSchool = (function() {

    /**
    	 * @property id
    	 * @final
    	 * @type String
     */

    /**
    	 * @property name
    	 * @final
    	 * @type String
     */

    /**
    	 * @property url
    	 * @final
    	 * @type String
     */
    function MagisterSchool(id, name, url) {
      this.id = id;
      this.name = name;
      this.url = url;
    }


    /**
    	 * Gets the schools that matches the given query.
    	 *
    	 * @method getSchools
    	 * @async
    	 * @static
    	 * @param query {String} The query the school should match to. Should be at least 3 chars long.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {MagisterSchool[]} An array containing the MagisterSchools.
     */

    MagisterSchool.getSchools = function(query, callback) {
      if ((query == null) || root._helpers.trim(query).length < 3) {
        callback(null, []);
        return;
      }
      query = query.replace(/\d/g, "").trim();
      return new MagisterHttp().get("https://mijn.magister.net/api/schools?filter=" + query, {}, (function(_this) {
        return function(error, result) {
          var s;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref12, _results;
              _ref12 = JSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
                s = _ref12[_i];
                _results.push(this._convertRaw(s));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    MagisterSchool._convertRaw = function(raw) {
      return new root.MagisterSchool(raw.Id, raw.Name, raw.Url);
    };

    return MagisterSchool;

  })();

  root = (_ref12 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref12 : this;


  /**
   * A StudyGuide, containing various Files and Links teachers can put on Magister.
   *
   * @class StudyGuide
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuide is child of.
   */

  root.StudyGuide = (function() {
    function StudyGuide(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date
       */
      this.from = root._getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date
       */
      this.to = root._getset("_to");

      /**
      		 * @property classCodes
      		 * @final
      		 * @type String[]
       */
      this.classCodes = root._getset("_classCodes");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property archived
      		 * @final
      		 * @type Boolean
       */
      this.archived = root._getset("_archived");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");
    }


    /**
    	 * Get the parts of this StudyGuide.
    	 *
    	 * @method parts
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {StudyGuidePart[]} The parts of this StudyGuide of the current logged in user.
     */

    StudyGuide.prototype.parts = function(callback) {
      if (callback == null) {
        return;
      }
      return this._magisterObj.http.get("" + this._magisterObj._pupilUrl + "/studiewijzers/" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var id, p, pushResult, _i, _len, _ref13, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content).Onderdelen.Items;
            pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
              return callback(null, r);
            });
            _ref13 = (function() {
              var _j, _len, _results1;
              _results1 = [];
              for (_j = 0, _len = result.length; _j < _len; _j++) {
                p = result[_j];
                _results1.push(p.Id);
              }
              return _results1;
            })();
            _results = [];
            for (_i = 0, _len = _ref13.length; _i < _len; _i++) {
              id = _ref13[_i];
              _results.push(_this._magisterObj.http.get("" + _this._magisterObj._pupilUrl + "/studiewijzers/" + (_this.id()) + "/onderdelen/" + id, {}, function(error, result) {
                return pushResult(root.StudyGuidePart._convertRaw(_this._magisterObj, JSON.parse(result.content)));
              }));
            }
            return _results;
          }
        };
      })(this));
    };

    StudyGuide._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.StudyGuide(magisterObj);
      obj._id = raw.Id;
      obj._from = new Date(Date.parse(raw.Van));
      obj._to = new Date(Date.parse(raw.TotEnMet));
      obj._classCodes = raw.VakCodes;
      obj._class = raw.VakCodes[0];
      obj._name = raw.Titel;
      obj._archived = raw.InLeerlingArchief;
      return obj;
    };

    return StudyGuide;

  })();


  /**
   * A part of a StudyGuide.
   *
   * @class StudyGuidePart
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuidePart is child of.
   */

  root.StudyGuidePart = (function() {
    function StudyGuidePart(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date
       */
      this.from = root._getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date
       */
      this.to = root._getset("_to");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description", null, function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/&amp;/ig, "&");
        } else {
          return x;
        }
      });

      /**
      		 * @property visible
      		 * @final
      		 * @type Boolean
       */
      this.visible = root._getset("_visible");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = root._getset("_files");
    }

    StudyGuidePart._convertRaw = function(magisterObj, raw) {
      var f, obj;
      obj = new root.StudyGuidePart(magisterObj);
      obj._id = raw.Id;
      obj._from = new Date(Date.parse(raw.Van));
      obj._to = new Date(Date.parse(raw.TotEnMet));
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._visible = raw.IsZichtbaar;
      obj._number = raw.Volgnummer;
      obj._files = (function() {
        var _i, _len, _ref13, _results;
        _ref13 = raw.Bronnen;
        _results = [];
        for (_i = 0, _len = _ref13.length; _i < _len; _i++) {
          f = _ref13[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      return obj;
    };

    return StudyGuidePart;

  })();

  root = (_ref13 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref13 : this;


  /**
   * A utility class containing various helper methods.
   *
   * @static
   * @private
   * @class _helpers
   */

  root._helpers = (function() {
    function _helpers() {}


    /**
    	 * Adds a zero in front of the original number if it doesn't yet.
    	 *
    	 * @method addZero
    	 * @param original {Number} The number to add a zero in front to.
    	 * @return {String} The number as string with a zero in front of it.
     */

    _helpers.addZero = function(original) {
      if (original < 10) {
        return "0" + original;
      } else {
        return original.toString();
      }
    };

    _helpers.toUtcString = function(d) {
      return "" + (_helpers.addZero(d.getUTCFullYear())) + "-" + (_helpers.addZero(d.getMonth() + 1)) + "-" + (_helpers.addZero(d.getDate())) + "T" + (_helpers.addZero(d.getHours())) + ":" + (_helpers.addZero(d.getMinutes())) + ":" + (_helpers.addZero(d.getSeconds())) + ".0000000Z";
    };

    _helpers.pushMore = function(arr, items) {
      [].push.apply(arr, items);
      return arr;
    };


    /**
    	 * Checks if the given original string contains the given query string.
    	 *
    	 * @method contains
    	 * @param original {String} The original string to search in.
    	 * @param query {String} The string to search for.
    	 * @param ignoreCasing {Boolean} Whether to ignore the casing of the search.
    	 * @return {Boolean} Whether the original string contains the query string.
     */

    _helpers.contains = function(original, query, ignoreCasing) {
      if (ignoreCasing == null) {
        ignoreCasing = false;
      }
      if (ignoreCasing) {
        return original.toUpperCase().indexOf(query.toUpperCase()) >= 0;
      } else {
        return original.indexOf(query) >= 0;
      }
    };


    /**
    	 * Returns a function which requires a result, when all results are pushed the callback is called with the result.
    	 *
    	 * @method asyncResultWaiter
    	 * @param amount {Number} The amount of results needed before the callback is called.
    	 * @param callback {Function} The callback which will be called when all the results are pushed.
    	 * @return {Function} The function which should be called with the reuslts.
     */

    _helpers.asyncResultWaiter = function(amount, callback) {
      var left, results;
      if (amount === 0) {
        callback([]);
      }
      results = [];
      left = amount;
      return function(result) {
        if (_.isArray(result)) {
          _helpers.pushMore(results, result);
          left -= result.length;
        } else {
          results.push(result);
          left--;
        }
        if (left === 0) {
          return callback(results);
        }
      };
    };

    _helpers.trim = function(original) {
      if (!((original != null) && original.length !== 0)) {
        return "";
      }
      if (_.isFunction(String.prototype.trim)) {
        return original.trim();
      } else {
        return original.replace(/^\s+|\s+$/g, "");
      }
    };

    _helpers.saveFile = function(rawData, mime, name) {
      try {
        return saveAs(new Blob([rawData], {
          type: mime
        }), name);
      } catch (_error) {}
    };

    _helpers.urlDateConvert = function(date) {
      return "" + (date.getUTCFullYear()) + "-" + (_helpers.addZero(date.getMonth() + 1)) + "-" + (_helpers.addZero(date.getDate()));
    };

    _helpers.date = function(date) {
      return new Date(date.getUTCFullYear(), date.getMonth(), date.getDate());
    };

    return _helpers;

  })();

  root._getset = function(varName, setter, getter) {
    return function(newVar) {
      if (newVar != null) {
        if (_.isFunction(setter)) {
          setter(newVar, true);
        } else {
          throw new Error("Changes on this property aren't allowed");
        }
      }
      if (_.isFunction(getter)) {
        return getter(this[varName], false);
      } else {
        return this[varName];
      }
    };
  };

  if (Array.isArray == null) {
    _.isArray = jQuery.isArray = Array.isArray = function(x) {
      return Object.prototype.toString.call(x === "[object Array]");
    };
  }

  /*! @source https://github.com/eligrey/Blob.js */
!function(a){"use strict";if(a.URL=a.URL||a.webkitURL,a.Blob&&a.URL)try{return new Blob,void 0}catch(b){}var c=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||function(a){var b=function(a){return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]},c=function(){this.data=[]},d=function(a,b,c){this.data=a,this.size=a.length,this.type=b,this.encoding=c},e=c.prototype,f=d.prototype,g=a.FileReaderSync,h=function(a){this.code=this[this.name=a]},i="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),j=i.length,k=a.URL||a.webkitURL||a,l=k.createObjectURL,m=k.revokeObjectURL,n=k,o=a.btoa,p=a.atob,q=a.ArrayBuffer,r=a.Uint8Array,s=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(d.fake=f.fake=!0;j--;)h.prototype[i[j]]=j+1;return k.createObjectURL||(n=a.URL=function(a){var c,b=document.createElementNS("http://www.w3.org/1999/xhtml","a");return b.href=a,"origin"in b||("data:"===b.protocol.toLowerCase()?b.origin=null:(c=a.match(s),b.origin=c&&c[1])),b}),n.createObjectURL=function(a){var c,b=a.type;return null===b&&(b="application/octet-stream"),a instanceof d?(c="data:"+b,"base64"===a.encoding?c+";base64,"+a.data:"URI"===a.encoding?c+","+decodeURIComponent(a.data):o?c+";base64,"+o(a.data):c+","+encodeURIComponent(a.data)):l?l.call(k,a):void 0},n.revokeObjectURL=function(a){"data:"!==a.substring(0,5)&&m&&m.call(k,a)},e.append=function(a){var c=this.data;if(r&&(a instanceof q||a instanceof r)){for(var e="",f=new r(a),i=0,j=f.length;j>i;i++)e+=String.fromCharCode(f[i]);c.push(e)}else if("Blob"===b(a)||"File"===b(a)){if(!g)throw new h("NOT_READABLE_ERR");var k=new g;c.push(k.readAsBinaryString(a))}else a instanceof d?"base64"===a.encoding&&p?c.push(p(a.data)):"URI"===a.encoding?c.push(decodeURIComponent(a.data)):"raw"===a.encoding&&c.push(a.data):("string"!=typeof a&&(a+=""),c.push(unescape(encodeURIComponent(a))))},e.getBlob=function(a){return arguments.length||(a=null),new d(this.data.join(""),a,"raw")},e.toString=function(){return"[object BlobBuilder]"},f.slice=function(a,b,c){var e=arguments.length;return 3>e&&(c=null),new d(this.data.slice(a,e>1?b:this.data.length),c,this.encoding)},f.toString=function(){return"[object Blob]"},f.close=function(){this.size=0,delete this.data},c}(a);a.Blob=function(a,b){var d=b?b.type||"":"",e=new c;if(a)for(var f=0,g=a.length;g>f;f++)e.append(a[f]);return e.getBlob(d)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this);

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
saveAs = void 0;
try{
saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});}catch(e){};

}).call(this);

if (typeof module === "undefined" || !module.exports) { // Export stuff to keep inline with Node.
	Magister = {
		Appointment: this.Appointment,
		Assignment: this.Assignment,
		AssignmentVersion: this.AssignmentVersion,
		Class: this.Class,
		Course: this.Course,
		DetailedProfileInfo: this.DetailedProfileInfo,
		DigitalSchoolUtility: this.DigitalSchoolUtility,
		File: this.File,
		FileFolder: this.FileFolder,
		Grade: this.Grade,
		GradeType: this.GradeType,
		Magister: this.Magister,
		MagisterSchool: this.MagisterSchool,
		Message: this.Message,
		MessageFolder: this.MessageFolder,
		Person: this.Person,
		ProfileInfo: this.ProfileInfo,
		StudyGuide: this.StudyGuide,
		StudyGuidePart: this.StudyGuidePart
	};
}