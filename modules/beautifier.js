!(function () {
  !(function () {
    "use strict";
    var i = [
        ,
        ,
        function (t) {
          function _(t) {
            (this.__parent = t),
              (this.__character_count = 0),
              (this.__indent_count = -1),
              (this.__alignment_count = 0),
              (this.__wrap_point_index = 0),
              (this.__wrap_point_character_count = 0),
              (this.__wrap_point_indent_count = -1),
              (this.__wrap_point_alignment_count = 0),
              (this.__items = []);
          }
          function n(t, e) {
            (this.__cache = [""]),
              (this.__indent_size = t.indent_size),
              (this.__indent_string = t.indent_char),
              t.indent_with_tabs ||
                (this.__indent_string = new Array(t.indent_size + 1).join(
                  t.indent_char
                )),
              (e = e || ""),
              0 < t.indent_level &&
                (e = new Array(t.indent_level + 1).join(this.__indent_string)),
              (this.__base_string = e),
              (this.__base_string_length = e.length);
          }
          function e(t, e) {
            (this.__indent_cache = new n(t, e)),
              (this.raw = !1),
              (this._end_with_newline = t.end_with_newline),
              (this.indent_size = t.indent_size),
              (this.wrap_line_length = t.wrap_line_length),
              (this.indent_empty_lines = t.indent_empty_lines),
              (this.__lines = []),
              (this.previous_line = null),
              (this.current_line = null),
              (this.next_line = new _(this)),
              (this.space_before_token = !1),
              (this.non_breaking_space = !1),
              (this.previous_token_wrapped = !1),
              this.__add_outputline();
          }
          (_.prototype.clone_empty = function () {
            var t = new _(this.__parent);
            return t.set_indent(this.__indent_count, this.__alignment_count), t;
          }),
            (_.prototype.item = function (t) {
              return t < 0
                ? this.__items[this.__items.length + t]
                : this.__items[t];
            }),
            (_.prototype.has_match = function (t) {
              for (var e = this.__items.length - 1; 0 <= e; e--)
                if (this.__items[e].match(t)) return !0;
              return !1;
            }),
            (_.prototype.set_indent = function (t, e) {
              this.is_empty() &&
                ((this.__indent_count = t || 0),
                (this.__alignment_count = e || 0),
                (this.__character_count = this.__parent.get_indent_size(
                  this.__indent_count,
                  this.__alignment_count
                )));
            }),
            (_.prototype._set_wrap_point = function () {
              this.__parent.wrap_line_length &&
                ((this.__wrap_point_index = this.__items.length),
                (this.__wrap_point_character_count = this.__character_count),
                (this.__wrap_point_indent_count =
                  this.__parent.next_line.__indent_count),
                (this.__wrap_point_alignment_count =
                  this.__parent.next_line.__alignment_count));
            }),
            (_.prototype._should_wrap = function () {
              return (
                this.__wrap_point_index &&
                this.__character_count > this.__parent.wrap_line_length &&
                this.__wrap_point_character_count >
                  this.__parent.next_line.__character_count
              );
            }),
            (_.prototype._allow_wrap = function () {
              var t;
              return (
                !!this._should_wrap() &&
                (this.__parent.add_new_line(),
                (t = this.__parent.current_line).set_indent(
                  this.__wrap_point_indent_count,
                  this.__wrap_point_alignment_count
                ),
                (t.__items = this.__items.slice(this.__wrap_point_index)),
                (this.__items = this.__items.slice(0, this.__wrap_point_index)),
                (t.__character_count +=
                  this.__character_count - this.__wrap_point_character_count),
                (this.__character_count = this.__wrap_point_character_count),
                " " === t.__items[0] &&
                  (t.__items.splice(0, 1), --t.__character_count),
                !0)
              );
            }),
            (_.prototype.is_empty = function () {
              return 0 === this.__items.length;
            }),
            (_.prototype.last = function () {
              return this.is_empty()
                ? null
                : this.__items[this.__items.length - 1];
            }),
            (_.prototype.push = function (t) {
              this.__items.push(t);
              var e = t.lastIndexOf("\n");
              -1 !== e
                ? (this.__character_count = t.length - e)
                : (this.__character_count += t.length);
            }),
            (_.prototype.pop = function () {
              var t = null;
              return (
                this.is_empty() ||
                  ((t = this.__items.pop()),
                  (this.__character_count -= t.length)),
                t
              );
            }),
            (_.prototype._remove_indent = function () {
              0 < this.__indent_count &&
                (--this.__indent_count,
                (this.__character_count -= this.__parent.indent_size));
            }),
            (_.prototype._remove_wrap_indent = function () {
              0 < this.__wrap_point_indent_count &&
                --this.__wrap_point_indent_count;
            }),
            (_.prototype.trim = function () {
              for (; " " === this.last(); )
                this.__items.pop(), --this.__character_count;
            }),
            (_.prototype.toString = function () {
              var t = "";
              return (
                this.is_empty()
                  ? this.__parent.indent_empty_lines &&
                    (t = this.__parent.get_indent_string(this.__indent_count))
                  : ((t = this.__parent.get_indent_string(
                      this.__indent_count,
                      this.__alignment_count
                    )),
                    (t += this.__items.join(""))),
                t
              );
            }),
            (n.prototype.get_indent_size = function (t, e) {
              var n = this.__base_string_length;
              return (n =
                (n = t < 0 ? 0 : n) + t * this.__indent_size + (e = e || 0));
            }),
            (n.prototype.get_indent_string = function (t, e) {
              var n = this.__base_string;
              return (
                (e = e || 0),
                t < 0 && ((t = 0), (n = "")),
                (e += t * this.__indent_size),
                this.__ensure_cache(e),
                (n += this.__cache[e])
              );
            }),
            (n.prototype.__ensure_cache = function (t) {
              for (; t >= this.__cache.length; ) this.__add_column();
            }),
            (n.prototype.__add_column = function () {
              var t,
                e = this.__cache.length,
                n = "";
              this.__indent_size &&
                e >= this.__indent_size &&
                ((e -=
                  (t = Math.floor(e / this.__indent_size)) *
                  this.__indent_size),
                (n = new Array(t + 1).join(this.__indent_string))),
                e && (n += new Array(e + 1).join(" ")),
                this.__cache.push(n);
            }),
            (e.prototype.__add_outputline = function () {
              (this.previous_line = this.current_line),
                (this.current_line = this.next_line.clone_empty()),
                this.__lines.push(this.current_line);
            }),
            (e.prototype.get_line_number = function () {
              return this.__lines.length;
            }),
            (e.prototype.get_indent_string = function (t, e) {
              return this.__indent_cache.get_indent_string(t, e);
            }),
            (e.prototype.get_indent_size = function (t, e) {
              return this.__indent_cache.get_indent_size(t, e);
            }),
            (e.prototype.is_empty = function () {
              return !this.previous_line && this.current_line.is_empty();
            }),
            (e.prototype.add_new_line = function (t) {
              return (
                !(this.is_empty() || (!t && this.just_added_newline())) &&
                (this.raw || this.__add_outputline(), !0)
              );
            }),
            (e.prototype.get_code = function (t) {
              this.trim(!0);
              var e = this.current_line.pop(),
                e =
                  (e &&
                    ("\n" === e[e.length - 1] && (e = e.replace(/\n+$/g, "")),
                    this.current_line.push(e)),
                  this._end_with_newline && this.__add_outputline(),
                  this.__lines.join("\n"));
              return (e = "\n" !== t ? e.replace(/[\n]/g, t) : e);
            }),
            (e.prototype.set_wrap_point = function () {
              this.current_line._set_wrap_point();
            }),
            (e.prototype.set_indent = function (t, e) {
              return (
                this.next_line.set_indent((t = t || 0), (e = e || 0)),
                1 < this.__lines.length
                  ? (this.current_line.set_indent(t, e), !0)
                  : (this.current_line.set_indent(), !1)
              );
            }),
            (e.prototype.add_raw_token = function (t) {
              for (var e = 0; e < t.newlines; e++) this.__add_outputline();
              this.current_line.set_indent(-1),
                this.current_line.push(t.whitespace_before),
                this.current_line.push(t.text),
                (this.space_before_token = !1),
                (this.non_breaking_space = !1),
                (this.previous_token_wrapped = !1);
            }),
            (e.prototype.add_token = function (t) {
              this.__add_space_before_token(),
                this.current_line.push(t),
                (this.space_before_token = !1),
                (this.non_breaking_space = !1),
                (this.previous_token_wrapped = this.current_line._allow_wrap());
            }),
            (e.prototype.__add_space_before_token = function () {
              this.space_before_token &&
                !this.just_added_newline() &&
                (this.non_breaking_space || this.set_wrap_point(),
                this.current_line.push(" "));
            }),
            (e.prototype.remove_indent = function (t) {
              for (var e = this.__lines.length; t < e; )
                this.__lines[t]._remove_indent(), t++;
              this.current_line._remove_wrap_indent();
            }),
            (e.prototype.trim = function (t) {
              for (
                t = void 0 !== t && t, this.current_line.trim();
                t && 1 < this.__lines.length && this.current_line.is_empty();

              )
                this.__lines.pop(),
                  (this.current_line = this.__lines[this.__lines.length - 1]),
                  this.current_line.trim();
              this.previous_line =
                1 < this.__lines.length
                  ? this.__lines[this.__lines.length - 2]
                  : null;
            }),
            (e.prototype.just_added_newline = function () {
              return this.current_line.is_empty();
            }),
            (e.prototype.just_added_blankline = function () {
              return (
                this.is_empty() ||
                (this.current_line.is_empty() && this.previous_line.is_empty())
              );
            }),
            (e.prototype.ensure_empty_line_above = function (t, e) {
              for (var n = this.__lines.length - 2; 0 <= n; ) {
                var i = this.__lines[n];
                if (i.is_empty()) break;
                if (0 !== i.item(0).indexOf(t) && i.item(-1) !== e) {
                  this.__lines.splice(n + 1, 0, new _(this)),
                    (this.previous_line =
                      this.__lines[this.__lines.length - 2]);
                  break;
                }
                n--;
              }
            }),
            (t.exports.Output = e);
        },
        function (t) {
          t.exports.Token = function (t, e, n, i) {
            (this.type = t),
              (this.text = e),
              (this.comments_before = null),
              (this.newlines = n || 0),
              (this.whitespace_before = i || ""),
              (this.parent = null),
              (this.next = null),
              (this.previous = null),
              (this.opened = null),
              (this.closed = null),
              (this.directives = null);
          };
        },
        ,
        ,
        function (t) {
          function e(t, e) {
            (this.raw_options = n(t, e)),
              (this.disabled = this._get_boolean("disabled")),
              (this.eol = this._get_characters("eol", "auto")),
              (this.end_with_newline = this._get_boolean("end_with_newline")),
              (this.indent_size = this._get_number("indent_size", 4)),
              (this.indent_char = this._get_characters("indent_char", " ")),
              (this.indent_level = this._get_number("indent_level")),
              (this.preserve_newlines = this._get_boolean(
                "preserve_newlines",
                !0
              )),
              (this.max_preserve_newlines = this._get_number(
                "max_preserve_newlines",
                32786
              )),
              this.preserve_newlines || (this.max_preserve_newlines = 0),
              (this.indent_with_tabs = this._get_boolean(
                "indent_with_tabs",
                "\t" === this.indent_char
              )),
              this.indent_with_tabs &&
                ((this.indent_char = "\t"),
                1 === this.indent_size && (this.indent_size = 4)),
              (this.wrap_line_length = this._get_number(
                "wrap_line_length",
                this._get_number("max_char")
              )),
              (this.indent_empty_lines =
                this._get_boolean("indent_empty_lines")),
              (this.templating = this._get_selection_list(
                "templating",
                [
                  "auto",
                  "none",
                  "django",
                  "erb",
                  "handlebars",
                  "php",
                  "smarty",
                ],
                ["auto"]
              ));
          }
          function n(t, e) {
            var n,
              i = {};
            for (n in (t = _(t))) n !== e && (i[n] = t[n]);
            if (e && t[e]) for (n in t[e]) i[n] = t[e][n];
            return i;
          }
          function _(t) {
            var e,
              n = {};
            for (e in t) n[e.replace(/-/g, "_")] = t[e];
            return n;
          }
          (e.prototype._get_array = function (t, e) {
            (t = this.raw_options[t]), (e = e || []);
            return (
              "object" == typeof t
                ? null !== t &&
                  "function" == typeof t.concat &&
                  (e = t.concat())
                : "string" == typeof t && (e = t.split(/[^a-zA-Z0-9_\/\-]+/)),
              e
            );
          }),
            (e.prototype._get_boolean = function (t, e) {
              t = this.raw_options[t];
              return void 0 === t ? !!e : !!t;
            }),
            (e.prototype._get_characters = function (t, e) {
              (t = this.raw_options[t]), (e = e || "");
              return (e =
                "string" == typeof t
                  ? t
                      .replace(/\\r/, "\r")
                      .replace(/\\n/, "\n")
                      .replace(/\\t/, "\t")
                  : e);
            }),
            (e.prototype._get_number = function (t, e) {
              (t = this.raw_options[t]),
                (e = parseInt(e, 10)),
                isNaN(e) && (e = 0),
                (t = parseInt(t, 10));
              return (t = isNaN(t) ? e : t);
            }),
            (e.prototype._get_selection = function (t, e, n) {
              n = this._get_selection_list(t, e, n);
              if (1 !== n.length)
                throw new Error(
                  "Invalid Option Value: The option '" +
                    t +
                    "' can only be one of the following values:\n" +
                    e +
                    "\nYou passed in: '" +
                    this.raw_options[t] +
                    "'"
                );
              return n[0];
            }),
            (e.prototype._get_selection_list = function (t, e, n) {
              if (!e || 0 === e.length)
                throw new Error("Selection list cannot be empty.");
              if (((n = n || [e[0]]), !this._is_valid_selection(n, e)))
                throw new Error("Invalid Default Value!");
              n = this._get_array(t, n);
              if (this._is_valid_selection(n, e)) return n;
              throw new Error(
                "Invalid Option Value: The option '" +
                  t +
                  "' can contain only the following values:\n" +
                  e +
                  "\nYou passed in: '" +
                  this.raw_options[t] +
                  "'"
              );
            }),
            (e.prototype._is_valid_selection = function (t, e) {
              return (
                t.length &&
                e.length &&
                !t.some(function (t) {
                  return -1 === e.indexOf(t);
                })
              );
            }),
            (t.exports.Options = e),
            (t.exports.normalizeOpts = _),
            (t.exports.mergeOpts = n);
        },
        ,
        function (t) {
          var i = RegExp.prototype.hasOwnProperty("sticky");
          function e(t) {
            (this.__input = t || ""),
              (this.__input_length = this.__input.length),
              (this.__position = 0);
          }
          (e.prototype.restart = function () {
            this.__position = 0;
          }),
            (e.prototype.back = function () {
              0 < this.__position && --this.__position;
            }),
            (e.prototype.hasNext = function () {
              return this.__position < this.__input_length;
            }),
            (e.prototype.next = function () {
              var t = null;
              return (
                this.hasNext() &&
                  ((t = this.__input.charAt(this.__position)),
                  (this.__position += 1)),
                t
              );
            }),
            (e.prototype.peek = function (t) {
              var e = null;
              return (
                (t = t || 0),
                (e =
                  0 <= (t += this.__position) && t < this.__input_length
                    ? this.__input.charAt(t)
                    : e)
              );
            }),
            (e.prototype.__match = function (t, e) {
              t.lastIndex = e;
              var n = t.exec(this.__input);
              return !n || (i && t.sticky) || (n.index !== e && (n = null)), n;
            }),
            (e.prototype.test = function (t, e) {
              return (
                (e = e || 0),
                0 <= (e += this.__position) &&
                  e < this.__input_length &&
                  !!this.__match(t, e)
              );
            }),
            (e.prototype.testChar = function (t, e) {
              e = this.peek(e);
              return (t.lastIndex = 0), null !== e && t.test(e);
            }),
            (e.prototype.match = function (t) {
              t = this.__match(t, this.__position);
              return t ? (this.__position += t[0].length) : (t = null), t;
            }),
            (e.prototype.read = function (t, e, n) {
              var i,
                _ = "";
              return (
                t && (i = this.match(t)) && (_ += i[0]),
                !e || (!i && t) || (_ += this.readUntil(e, n)),
                _
              );
            }),
            (e.prototype.readUntil = function (t, e) {
              var n = this.__position,
                t = ((t.lastIndex = this.__position), t.exec(this.__input));
              return (
                t
                  ? ((n = t.index), e && (n += t[0].length))
                  : (n = this.__input_length),
                (e = this.__input.substring(this.__position, n)),
                (this.__position = n),
                e
              );
            }),
            (e.prototype.readUntilAfter = function (t) {
              return this.readUntil(t, !0);
            }),
            (e.prototype.get_regexp = function (t, e) {
              var n = null,
                e = e && i ? "y" : "g";
              return (
                "string" == typeof t && "" !== t
                  ? (n = new RegExp(t, e))
                  : t && (n = new RegExp(t.source, e)),
                n
              );
            }),
            (e.prototype.get_literal_regexp = function (t) {
              return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
            }),
            (e.prototype.peekUntilAfter = function (t) {
              var e = this.__position,
                t = this.readUntilAfter(t);
              return (this.__position = e), t;
            }),
            (e.prototype.lookBack = function (t) {
              var e = this.__position - 1;
              return (
                e >= t.length &&
                this.__input.substring(e - t.length, e).toLowerCase() === t
              );
            }),
            (t.exports.InputScanner = e);
        },
        function (t, e, n) {
          function i(t, e) {
            (this._input = new _(t)),
              (this._options = e || {}),
              (this.__tokens = null),
              (this._patterns = {}),
              (this._patterns.whitespace = new a(this._input));
          }
          var _ = n(8).InputScanner,
            s = n(3).Token,
            r = n(10).TokenStream,
            a = n(11).WhitespacePattern,
            o = { START: "TK_START", RAW: "TK_RAW", EOF: "TK_EOF" };
          (i.prototype.tokenize = function () {
            this._input.restart(), (this.__tokens = new r()), this._reset();
            for (
              var t, e = new s(o.START, ""), n = null, i = [], _ = new r();
              e.type !== o.EOF;

            ) {
              for (t = this._get_next_token(e, n); this._is_comment(t); )
                _.add(t), (t = this._get_next_token(e, n));
              _.isEmpty() || ((t.comments_before = _), (_ = new r())),
                (t.parent = n),
                this._is_opening(t)
                  ? (i.push(n), (n = t))
                  : n &&
                    this._is_closing(t, n) &&
                    (((t.opened = n).closed = t),
                    (n = i.pop()),
                    (t.parent = n)),
                ((t.previous = e).next = t),
                this.__tokens.add(t),
                (e = t);
            }
            return this.__tokens;
          }),
            (i.prototype._is_first_token = function () {
              return this.__tokens.isEmpty();
            }),
            (i.prototype._reset = function () {}),
            (i.prototype._get_next_token = function (t, e) {
              this._readWhitespace();
              var n = this._input.read(/.+/g);
              return n
                ? this._create_token(o.RAW, n)
                : this._create_token(o.EOF, "");
            }),
            (i.prototype._is_comment = function (t) {
              return !1;
            }),
            (i.prototype._is_opening = function (t) {
              return !1;
            }),
            (i.prototype._is_closing = function (t, e) {
              return !1;
            }),
            (i.prototype._create_token = function (t, e) {
              return new s(
                t,
                e,
                this._patterns.whitespace.newline_count,
                this._patterns.whitespace.whitespace_before_token
              );
            }),
            (i.prototype._readWhitespace = function () {
              return this._patterns.whitespace.read();
            }),
            (t.exports.Tokenizer = i),
            (t.exports.TOKEN = o);
        },
        function (t) {
          function e(t) {
            (this.__tokens = []),
              (this.__tokens_length = this.__tokens.length),
              (this.__position = 0),
              (this.__parent_token = t);
          }
          (e.prototype.restart = function () {
            this.__position = 0;
          }),
            (e.prototype.isEmpty = function () {
              return 0 === this.__tokens_length;
            }),
            (e.prototype.hasNext = function () {
              return this.__position < this.__tokens_length;
            }),
            (e.prototype.next = function () {
              var t = null;
              return (
                this.hasNext() &&
                  ((t = this.__tokens[this.__position]),
                  (this.__position += 1)),
                t
              );
            }),
            (e.prototype.peek = function (t) {
              var e = null;
              return (
                (t = t || 0),
                (e =
                  0 <= (t += this.__position) && t < this.__tokens_length
                    ? this.__tokens[t]
                    : e)
              );
            }),
            (e.prototype.add = function (t) {
              this.__parent_token && (t.parent = this.__parent_token),
                this.__tokens.push(t),
                (this.__tokens_length += 1);
            }),
            (t.exports.TokenStream = e);
        },
        function (t, e, n) {
          var i = n(12).Pattern;
          function _(t, e) {
            i.call(this, t, e),
              e
                ? (this._line_regexp = this._input.get_regexp(e._line_regexp))
                : this.__set_whitespace_patterns("", ""),
              (this.newline_count = 0),
              (this.whitespace_before_token = "");
          }
          ((_.prototype = new i()).__set_whitespace_patterns = function (t, e) {
            (this._match_pattern = this._input.get_regexp(
              "[" + (t += "\\t ") + (e += "\\n\\r") + "]+",
              !0
            )),
              (this._newline_regexp = this._input.get_regexp(
                "\\r\\n|[" + e + "]"
              ));
          }),
            (_.prototype.read = function () {
              (this.newline_count = 0), (this.whitespace_before_token = "");
              var t,
                e = this._input.read(this._match_pattern);
              return (
                " " === e
                  ? (this.whitespace_before_token = " ")
                  : e &&
                    ((t = this.__split(this._newline_regexp, e)),
                    (this.newline_count = t.length - 1),
                    (this.whitespace_before_token = t[this.newline_count])),
                e
              );
            }),
            (_.prototype.matching = function (t, e) {
              var n = this._create();
              return n.__set_whitespace_patterns(t, e), n._update(), n;
            }),
            (_.prototype._create = function () {
              return new _(this._input, this);
            }),
            (_.prototype.__split = function (t, e) {
              for (var n = (t.lastIndex = 0), i = [], _ = t.exec(e); _; )
                i.push(e.substring(n, _.index)),
                  (n = _.index + _[0].length),
                  (_ = t.exec(e));
              return (
                n < e.length ? i.push(e.substring(n, e.length)) : i.push(""), i
              );
            }),
            (t.exports.WhitespacePattern = _);
        },
        function (t) {
          function e(t, e) {
            (this._input = t),
              (this._starting_pattern = null),
              (this._match_pattern = null),
              (this._until_pattern = null),
              (this._until_after = !1),
              e &&
                ((this._starting_pattern = this._input.get_regexp(
                  e._starting_pattern,
                  !0
                )),
                (this._match_pattern = this._input.get_regexp(
                  e._match_pattern,
                  !0
                )),
                (this._until_pattern = this._input.get_regexp(
                  e._until_pattern
                )),
                (this._until_after = e._until_after));
          }
          (e.prototype.read = function () {
            var t = this._input.read(this._starting_pattern);
            return (
              (this._starting_pattern && !t) ||
                (t += this._input.read(
                  this._match_pattern,
                  this._until_pattern,
                  this._until_after
                )),
              t
            );
          }),
            (e.prototype.read_match = function () {
              return this._input.match(this._match_pattern);
            }),
            (e.prototype.until_after = function (t) {
              var e = this._create();
              return (
                (e._until_after = !0),
                (e._until_pattern = this._input.get_regexp(t)),
                e._update(),
                e
              );
            }),
            (e.prototype.until = function (t) {
              var e = this._create();
              return (
                (e._until_after = !1),
                (e._until_pattern = this._input.get_regexp(t)),
                e._update(),
                e
              );
            }),
            (e.prototype.starting_with = function (t) {
              var e = this._create();
              return (
                (e._starting_pattern = this._input.get_regexp(t, !0)),
                e._update(),
                e
              );
            }),
            (e.prototype.matching = function (t) {
              var e = this._create();
              return (
                (e._match_pattern = this._input.get_regexp(t, !0)),
                e._update(),
                e
              );
            }),
            (e.prototype._create = function () {
              return new e(this._input, this);
            }),
            (e.prototype._update = function () {}),
            (t.exports.Pattern = e);
        },
        function (t) {
          function e(t, e) {
            (t = "string" == typeof t ? t : t.source),
              (e = "string" == typeof e ? e : e.source),
              (this.__directives_block_pattern = new RegExp(
                t + / beautify( \w+[:]\w+)+ /.source + e,
                "g"
              )),
              (this.__directive_pattern = / (\w+)[:](\w+)/g),
              (this.__directives_end_ignore_pattern = new RegExp(
                t + /\sbeautify\signore:end\s/.source + e,
                "g"
              ));
          }
          (e.prototype.get_directives = function (t) {
            if (!t.match(this.__directives_block_pattern)) return null;
            for (
              var e = {},
                n =
                  ((this.__directive_pattern.lastIndex = 0),
                  this.__directive_pattern.exec(t));
              n;

            )
              (e[n[1]] = n[2]), (n = this.__directive_pattern.exec(t));
            return e;
          }),
            (e.prototype.readIgnored = function (t) {
              return t.readUntilAfter(this.__directives_end_ignore_pattern);
            }),
            (t.exports.Directives = e);
        },
        function (t, e, n) {
          var i = n(12).Pattern,
            _ = { django: !1, erb: !1, handlebars: !1, php: !1, smarty: !1 };
          function s(t, e) {
            i.call(this, t, e),
              (this.__template_pattern = null),
              (this._disabled = Object.assign({}, _)),
              (this._excluded = Object.assign({}, _)),
              e &&
                ((this.__template_pattern = this._input.get_regexp(
                  e.__template_pattern
                )),
                (this._excluded = Object.assign(this._excluded, e._excluded)),
                (this._disabled = Object.assign(this._disabled, e._disabled)));
            e = new i(t);
            this.__patterns = {
              handlebars_comment: e.starting_with(/{{!--/).until_after(/--}}/),
              handlebars_unescaped: e.starting_with(/{{{/).until_after(/}}}/),
              handlebars: e.starting_with(/{{/).until_after(/}}/),
              php: e.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
              erb: e.starting_with(/<%[^%]/).until_after(/[^%]%>/),
              django: e.starting_with(/{%/).until_after(/%}/),
              django_value: e.starting_with(/{{/).until_after(/}}/),
              django_comment: e.starting_with(/{#/).until_after(/#}/),
              smarty: e.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
              smarty_comment: e.starting_with(/{\*/).until_after(/\*}/),
              smarty_literal: e
                .starting_with(/{literal}/)
                .until_after(/{\/literal}/),
            };
          }
          ((s.prototype = new i())._create = function () {
            return new s(this._input, this);
          }),
            (s.prototype._update = function () {
              this.__set_templated_pattern();
            }),
            (s.prototype.disable = function (t) {
              var e = this._create();
              return (e._disabled[t] = !0), e._update(), e;
            }),
            (s.prototype.read_options = function (t) {
              var e,
                n = this._create();
              for (e in _) n._disabled[e] = -1 === t.templating.indexOf(e);
              return n._update(), n;
            }),
            (s.prototype.exclude = function (t) {
              var e = this._create();
              return (e._excluded[t] = !0), e._update(), e;
            }),
            (s.prototype.read = function () {
              for (
                var t = "",
                  t = this._match_pattern
                    ? this._input.read(this._starting_pattern)
                    : this._input.read(
                        this._starting_pattern,
                        this.__template_pattern
                      ),
                  e = this._read_template();
                e;

              )
                this._match_pattern
                  ? (e += this._input.read(this._match_pattern))
                  : (e += this._input.readUntil(this.__template_pattern)),
                  (t += e),
                  (e = this._read_template());
              return (
                this._until_after &&
                  (t += this._input.readUntilAfter(this._until_pattern)),
                t
              );
            }),
            (s.prototype.__set_templated_pattern = function () {
              var t = [];
              this._disabled.php ||
                t.push(this.__patterns.php._starting_pattern.source),
                this._disabled.handlebars ||
                  t.push(this.__patterns.handlebars._starting_pattern.source),
                this._disabled.erb ||
                  t.push(this.__patterns.erb._starting_pattern.source),
                this._disabled.django ||
                  (t.push(this.__patterns.django._starting_pattern.source),
                  t.push(this.__patterns.django_value._starting_pattern.source),
                  t.push(
                    this.__patterns.django_comment._starting_pattern.source
                  )),
                this._disabled.smarty ||
                  t.push(this.__patterns.smarty._starting_pattern.source),
                this._until_pattern && t.push(this._until_pattern.source),
                (this.__template_pattern = this._input.get_regexp(
                  "(?:" + t.join("|") + ")"
                ));
            }),
            (s.prototype._read_template = function () {
              var t,
                e = "",
                n = this._input.peek();
              return (
                "<" === n
                  ? ((t = this._input.peek(1)),
                    this._disabled.php ||
                      this._excluded.php ||
                      "?" !== t ||
                      (e = e || this.__patterns.php.read()),
                    this._disabled.erb ||
                      this._excluded.erb ||
                      "%" !== t ||
                      (e = e || this.__patterns.erb.read()))
                  : "{" === n &&
                    (this._disabled.handlebars ||
                      this._excluded.handlebars ||
                      (e =
                        (e =
                          (e =
                            e || this.__patterns.handlebars_comment.read()) ||
                          this.__patterns.handlebars_unescaped.read()) ||
                        this.__patterns.handlebars.read()),
                    this._disabled.django ||
                      (this._excluded.django ||
                        this._excluded.handlebars ||
                        (e = e || this.__patterns.django_value.read()),
                      this._excluded.django ||
                        (e =
                          (e = e || this.__patterns.django_comment.read()) ||
                          this.__patterns.django.read())),
                    this._disabled.smarty ||
                      (this._disabled.django &&
                        this._disabled.handlebars &&
                        (e =
                          (e =
                            (e = e || this.__patterns.smarty_comment.read()) ||
                            this.__patterns.smarty_literal.read()) ||
                          this.__patterns.smarty.read()))),
                e
              );
            }),
            (t.exports.TemplatablePattern = s);
        },
        ,
        ,
        ,
        function (t, e, n) {
          var _ = n(19).Beautifier,
            i = n(20).Options;
          (t.exports = function (t, e, n, i) {
            return new _(t, e, n, i).beautify();
          }),
            (t.exports.defaultOptions = function () {
              return new i();
            });
        },
        function (t, e, n) {
          function p(t, e) {
            (this.indent_level = 0),
              (this.alignment_size = 0),
              (this.max_preserve_newlines = t.max_preserve_newlines),
              (this.preserve_newlines = t.preserve_newlines),
              (this._output = new i(t, e));
          }
          function s(t, e) {
            var n = null,
              i = null;
            return e.closed
              ? ("script" === t
                  ? (n = "text/javascript")
                  : "style" === t && (n = "text/css"),
                -1 <
                (n =
                  (function (t) {
                    for (
                      var e = null, n = t.next;
                      n.type !== u.EOF && t.closed !== n;

                    ) {
                      if (n.type === u.ATTRIBUTE && "type" === n.text) {
                        n.next &&
                          n.next.type === u.EQUALS &&
                          n.next.next &&
                          n.next.next.type === u.VALUE &&
                          (e = n.next.next.text);
                        break;
                      }
                      n = n.next;
                    }
                    return e;
                  })(e) || n).search("text/css")
                  ? (i = "css")
                  : -1 <
                    n.search(
                      /module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/
                    )
                  ? (i = "javascript")
                  : -1 < n.search(/(text|application|dojo)\/(x-)?(html)/)
                  ? (i = "html")
                  : -1 < n.search(/test\/null/) && (i = "null"),
                i)
              : null;
          }
          var _ = n(20).Options,
            i = n(2).Output,
            h = n(21).Tokenizer,
            u = n(21).TOKEN,
            l = /\r\n|[\r\n]/,
            c = /\r\n|[\r\n]/g;
          (p.prototype.current_line_has_match = function (t) {
            return this._output.current_line.has_match(t);
          }),
            (p.prototype.set_space_before_token = function (t, e) {
              (this._output.space_before_token = t),
                (this._output.non_breaking_space = e);
            }),
            (p.prototype.set_wrap_point = function () {
              this._output.set_indent(this.indent_level, this.alignment_size),
                this._output.set_wrap_point();
            }),
            (p.prototype.add_raw_token = function (t) {
              this._output.add_raw_token(t);
            }),
            (p.prototype.print_preserved_newlines = function (t) {
              var e = 0;
              t.type !== u.TEXT &&
                t.previous.type !== u.TEXT &&
                (e = t.newlines ? 1 : 0),
                this.preserve_newlines &&
                  (e =
                    t.newlines < this.max_preserve_newlines + 1
                      ? t.newlines
                      : this.max_preserve_newlines + 1);
              for (var n = 0; n < e; n++) this.print_newline(0 < n);
              return 0 !== e;
            }),
            (p.prototype.traverse_whitespace = function (t) {
              return (
                !(!t.whitespace_before && !t.newlines) &&
                (this.print_preserved_newlines(t) ||
                  (this._output.space_before_token = !0),
                !0)
              );
            }),
            (p.prototype.previous_token_wrapped = function () {
              return this._output.previous_token_wrapped;
            }),
            (p.prototype.print_newline = function (t) {
              this._output.add_new_line(t);
            }),
            (p.prototype.print_token = function (t) {
              t.text &&
                (this._output.set_indent(
                  this.indent_level,
                  this.alignment_size
                ),
                this._output.add_token(t.text));
            }),
            (p.prototype.indent = function () {
              this.indent_level++;
            }),
            (p.prototype.get_full_indent = function (t) {
              return (t = this.indent_level + (t || 0)) < 1
                ? ""
                : this._output.get_indent_string(t);
            });
          function r(t, e) {
            return -1 !== e.indexOf(t);
          }
          function a(t, e, n) {
            (this.parent = t || null),
              (this.tag = e ? e.tag_name : ""),
              (this.indent_level = n || 0),
              (this.parser_token = e || null);
          }
          function d(t) {
            (this._printer = t), (this._current_frame = null);
          }
          function g(t, e, n, i) {
            (this._source_text = t || ""),
              (e = e || {}),
              (this._js_beautify = n),
              (this._css_beautify = i),
              (this._tag_stack = null);
            t = new _(e, "html");
            (this._options = t),
              (this._is_wrap_attributes_force =
                "force" ===
                this._options.wrap_attributes.substr(0, "force".length)),
              (this._is_wrap_attributes_force_expand_multiline =
                "force-expand-multiline" === this._options.wrap_attributes),
              (this._is_wrap_attributes_force_aligned =
                "force-aligned" === this._options.wrap_attributes),
              (this._is_wrap_attributes_aligned_multiple =
                "aligned-multiple" === this._options.wrap_attributes),
              (this._is_wrap_attributes_preserve =
                "preserve" ===
                this._options.wrap_attributes.substr(0, "preserve".length)),
              (this._is_wrap_attributes_preserve_aligned =
                "preserve-aligned" === this._options.wrap_attributes);
          }
          (d.prototype.get_parser_token = function () {
            return this._current_frame
              ? this._current_frame.parser_token
              : null;
          }),
            (d.prototype.record_tag = function (t) {
              t = new a(this._current_frame, t, this._printer.indent_level);
              this._current_frame = t;
            }),
            (d.prototype._try_pop_frame = function (t) {
              var e = null;
              return (
                t &&
                  ((e = t.parser_token),
                  (this._printer.indent_level = t.indent_level),
                  (this._current_frame = t.parent)),
                e
              );
            }),
            (d.prototype._get_frame = function (t, e) {
              for (
                var n = this._current_frame;
                n && -1 === t.indexOf(n.tag);

              ) {
                if (e && -1 !== e.indexOf(n.tag)) {
                  n = null;
                  break;
                }
                n = n.parent;
              }
              return n;
            }),
            (d.prototype.try_pop = function (t, e) {
              t = this._get_frame([t], e);
              return this._try_pop_frame(t);
            }),
            (d.prototype.indent_to_tag = function (t) {
              t = this._get_frame(t);
              t && (this._printer.indent_level = t.indent_level);
            }),
            (g.prototype.beautify = function () {
              if (this._options.disabled) return this._source_text;
              for (
                var t = this._source_text,
                  e = this._options.eol,
                  n =
                    ("auto" === this._options.eol &&
                      ((e = "\n"), t && l.test(t) && (e = t.match(l)[0])),
                    (t = t.replace(c, "\n")).match(/^[\t ]*/)[0]),
                  i = { text: "", type: "" },
                  _ = new f(),
                  s = new p(this._options, n),
                  r = new h(t, this._options).tokenize(),
                  a = ((this._tag_stack = new d(s)), null),
                  o = r.next();
                o.type !== u.EOF;

              )
                o.type === u.TAG_OPEN || o.type === u.COMMENT
                  ? (_ = a = this._handle_tag_open(s, o, _, i))
                  : o.type === u.ATTRIBUTE ||
                    o.type === u.EQUALS ||
                    o.type === u.VALUE ||
                    (o.type === u.TEXT && !_.tag_complete)
                  ? (a = this._handle_inside_tag(s, o, _, r))
                  : o.type === u.TAG_CLOSE
                  ? (a = this._handle_tag_close(s, o, _))
                  : o.type === u.TEXT
                  ? (a = this._handle_text(s, o, _))
                  : s.add_raw_token(o),
                  (i = a),
                  (o = r.next());
              return s._output.get_code(e);
            }),
            (g.prototype._handle_tag_close = function (t, e, n) {
              var i = { text: e.text, type: e.type };
              return (
                (t.alignment_size = 0),
                (n.tag_complete = !0),
                t.set_space_before_token(
                  e.newlines || "" !== e.whitespace_before,
                  !0
                ),
                n.is_unformatted
                  ? t.add_raw_token(e)
                  : ("<" === n.tag_start_char &&
                      (t.set_space_before_token("/" === e.text[0], !0),
                      this._is_wrap_attributes_force_expand_multiline &&
                        n.has_wrapped_attrs &&
                        t.print_newline(!1)),
                    t.print_token(e)),
                !n.indent_content ||
                  n.is_unformatted ||
                  n.is_content_unformatted ||
                  (t.indent(), (n.indent_content = !1)),
                n.is_inline_element ||
                  n.is_unformatted ||
                  n.is_content_unformatted ||
                  t.set_wrap_point(),
                i
              );
            }),
            (g.prototype._handle_inside_tag = function (t, e, n, i) {
              var _ = n.has_wrapped_attrs,
                s = { text: e.text, type: e.type };
              if (
                (t.set_space_before_token(
                  e.newlines || "" !== e.whitespace_before,
                  !0
                ),
                n.is_unformatted)
              )
                t.add_raw_token(e);
              else if ("{" === n.tag_start_char && e.type === u.TEXT)
                t.print_preserved_newlines(e)
                  ? ((e.newlines = 0), t.add_raw_token(e))
                  : t.print_token(e);
              else {
                if (
                  (e.type === u.ATTRIBUTE
                    ? (t.set_space_before_token(!0), (n.attr_count += 1))
                    : (e.type === u.EQUALS ||
                        (e.type === u.VALUE && e.previous.type === u.EQUALS)) &&
                      t.set_space_before_token(!1),
                  e.type === u.ATTRIBUTE &&
                    "<" === n.tag_start_char &&
                    ((this._is_wrap_attributes_preserve ||
                      this._is_wrap_attributes_preserve_aligned) &&
                      (t.traverse_whitespace(e), (_ = _ || 0 !== e.newlines)),
                    this._is_wrap_attributes_force))
                ) {
                  var r = 1 < n.attr_count;
                  if (
                    this._is_wrap_attributes_force_expand_multiline &&
                    1 === n.attr_count
                  ) {
                    var a,
                      o = !0,
                      p = 0;
                    do {
                      if ((a = i.peek(p)).type === u.ATTRIBUTE) {
                        o = !1;
                        break;
                      }
                    } while (
                      (p += 1) < 4 &&
                      a.type !== u.EOF &&
                      a.type !== u.TAG_CLOSE
                    );
                    r = !o;
                  }
                  r && (t.print_newline(!1), (_ = !0));
                }
                t.print_token(e),
                  (_ = _ || t.previous_token_wrapped()),
                  (n.has_wrapped_attrs = _);
              }
              return s;
            }),
            (g.prototype._handle_text = function (t, e, n) {
              var i = { text: e.text, type: "TK_CONTENT" };
              return (
                n.custom_beautifier_name
                  ? this._print_custom_beatifier_text(t, e, n)
                  : n.is_unformatted || n.is_content_unformatted
                  ? t.add_raw_token(e)
                  : (t.traverse_whitespace(e), t.print_token(e)),
                i
              );
            }),
            (g.prototype._print_custom_beatifier_text = function (t, e, n) {
              var i = this;
              if ("" !== e.text) {
                var _,
                  s = e.text,
                  r = 1,
                  a = "",
                  o = "",
                  r =
                    ("javascript" === n.custom_beautifier_name &&
                    "function" == typeof this._js_beautify
                      ? (_ = this._js_beautify)
                      : "css" === n.custom_beautifier_name &&
                        "function" == typeof this._css_beautify
                      ? (_ = this._css_beautify)
                      : "html" === n.custom_beautifier_name &&
                        (_ = function (t, e) {
                          return new g(
                            t,
                            e,
                            i._js_beautify,
                            i._css_beautify
                          ).beautify();
                        }),
                    "keep" === this._options.indent_scripts
                      ? (r = 0)
                      : "separate" === this._options.indent_scripts &&
                        (r = -t.indent_level),
                    t.get_full_indent(r));
                if (
                  ((s = s.replace(/\n[ \t]*$/, "")),
                  "html" !== n.custom_beautifier_name &&
                    "<" === s[0] &&
                    s.match(/^(<!--|<!\[CDATA\[)/))
                ) {
                  var n =
                    /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(
                      s
                    );
                  if (!n) return void t.add_raw_token(e);
                  (a = r + n[1] + "\n"),
                    (s = n[4]),
                    n[5] && (o = r + n[5]),
                    (s = s.replace(/\n[ \t]*$/, "")),
                    (n[2] || -1 !== n[3].indexOf("\n")) &&
                      (n = n[3].match(/[ \t]+$/)) &&
                      (e.whitespace_before = n[0]);
                }
                (s =
                  s &&
                  (_
                    ? (((n = function () {
                        this.eol = "\n";
                      }).prototype = this._options.raw_options),
                      _(r + s, new n()))
                    : r +
                      (s = (_ = e.whitespace_before)
                        ? s.replace(new RegExp("\n(" + _ + ")?", "g"), "\n")
                        : s).replace(/\n/g, "\n" + r))),
                  a && (s = s ? a + s + "\n" + o : a + o),
                  t.print_newline(!1),
                  s &&
                    ((e.text = s),
                    (e.whitespace_before = ""),
                    (e.newlines = 0),
                    t.add_raw_token(e),
                    t.print_newline(!0));
              }
            }),
            (g.prototype._handle_tag_open = function (t, e, n, i) {
              var _ = this._get_tag_open_token(e);
              return (
                (!n.is_unformatted && !n.is_content_unformatted) ||
                n.is_empty_element ||
                e.type !== u.TAG_OPEN ||
                0 !== e.text.indexOf("</")
                  ? (t.traverse_whitespace(e),
                    this._set_tag_position(t, e, _, n, i),
                    _.is_inline_element || t.set_wrap_point(),
                    t.print_token(e))
                  : (t.add_raw_token(e),
                    (_.start_tag_token = this._tag_stack.try_pop(_.tag_name))),
                (this._is_wrap_attributes_force_aligned ||
                  this._is_wrap_attributes_aligned_multiple ||
                  this._is_wrap_attributes_preserve_aligned) &&
                  (_.alignment_size = e.text.length + 1),
                _.tag_complete ||
                  _.is_unformatted ||
                  (t.alignment_size = _.alignment_size),
                _
              );
            });
          var f = function (t, e) {
              var n;
              (this.parent = t || null),
                (this.text = ""),
                (this.type = "TK_TAG_OPEN"),
                (this.tag_name = ""),
                (this.is_inline_element = !1),
                (this.is_unformatted = !1),
                (this.is_content_unformatted = !1),
                (this.is_empty_element = !1),
                (this.is_start_tag = !1),
                (this.is_end_tag = !1),
                (this.indent_content = !1),
                (this.multiline_content = !1),
                (this.custom_beautifier_name = null),
                (this.start_tag_token = null),
                (this.attr_count = 0),
                (this.has_wrapped_attrs = !1),
                (this.alignment_size = 0),
                (this.tag_complete = !1),
                (this.tag_start_char = ""),
                (this.tag_check = ""),
                e
                  ? ((this.tag_start_char = e.text[0]),
                    (this.text = e.text),
                    "<" === this.tag_start_char
                      ? ((n = e.text.match(/^<([^\s>]*)/)),
                        (this.tag_check = n ? n[1] : ""))
                      : ((n = e.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/)),
                        (this.tag_check = n ? n[1] : ""),
                        (e.text.startsWith("{{#>") ||
                          e.text.startsWith("{{~#>")) &&
                          ">" === this.tag_check[0] &&
                          (">" === this.tag_check && null !== e.next
                            ? (this.tag_check = e.next.text.split(" ")[0])
                            : (this.tag_check = e.text.split(">")[1]))),
                    (this.tag_check = this.tag_check.toLowerCase()),
                    e.type === u.COMMENT && (this.tag_complete = !0),
                    (this.is_start_tag = "/" !== this.tag_check.charAt(0)),
                    (this.tag_name = this.is_start_tag
                      ? this.tag_check
                      : this.tag_check.substr(1)),
                    (this.is_end_tag =
                      !this.is_start_tag ||
                      (e.closed && "/>" === e.closed.text)),
                    (t = 2),
                    "{" === this.tag_start_char &&
                      3 <= this.text.length &&
                      "~" === this.text.charAt(2) &&
                      (t = 3),
                    (this.is_end_tag =
                      this.is_end_tag ||
                      ("{" === this.tag_start_char &&
                        (this.text.length < 3 ||
                          /[^#\^]/.test(this.text.charAt(t))))))
                  : (this.tag_complete = !0);
            },
            o =
              ((g.prototype._get_tag_open_token = function (t) {
                t = new f(this._tag_stack.get_parser_token(), t);
                return (
                  (t.alignment_size =
                    this._options.wrap_attributes_indent_size),
                  (t.is_end_tag =
                    t.is_end_tag ||
                    r(t.tag_check, this._options.void_elements)),
                  (t.is_empty_element =
                    t.tag_complete || (t.is_start_tag && t.is_end_tag)),
                  (t.is_unformatted =
                    !t.tag_complete &&
                    r(t.tag_check, this._options.unformatted)),
                  (t.is_content_unformatted =
                    !t.is_empty_element &&
                    r(t.tag_check, this._options.content_unformatted)),
                  (t.is_inline_element =
                    r(t.tag_name, this._options.inline) ||
                    t.tag_name.includes("-") ||
                    "{" === t.tag_start_char),
                  t
                );
              }),
              (g.prototype._set_tag_position = function (t, e, n, i, _) {
                n.is_empty_element ||
                  (n.is_end_tag
                    ? (n.start_tag_token = this._tag_stack.try_pop(n.tag_name))
                    : (this._do_optional_end_element(n) &&
                        !n.is_inline_element &&
                        t.print_newline(!1),
                      this._tag_stack.record_tag(n),
                      ("script" !== n.tag_name && "style" !== n.tag_name) ||
                        n.is_unformatted ||
                        n.is_content_unformatted ||
                        (n.custom_beautifier_name = s(n.tag_check, e)))),
                  r(n.tag_check, this._options.extra_liners) &&
                    (t.print_newline(!1),
                    t._output.just_added_blankline() || t.print_newline(!0)),
                  n.is_empty_element
                    ? ("{" === n.tag_start_char &&
                        "else" === n.tag_check &&
                        (this._tag_stack.indent_to_tag([
                          "if",
                          "unless",
                          "each",
                        ]),
                        (n.indent_content = !0),
                        t.current_line_has_match(/{{#if/) ||
                          t.print_newline(!1)),
                      ("!--" === n.tag_name &&
                        _.type === u.TAG_CLOSE &&
                        i.is_end_tag &&
                        -1 === n.text.indexOf("\n")) ||
                        (n.is_inline_element ||
                          n.is_unformatted ||
                          t.print_newline(!1),
                        this._calcluate_parent_multiline(t, n)))
                    : n.is_end_tag
                    ? ((e = !1),
                      (e =
                        (e =
                          n.start_tag_token &&
                          n.start_tag_token.multiline_content) ||
                        (!n.is_inline_element &&
                          !(i.is_inline_element || i.is_unformatted) &&
                          !(
                            _.type === u.TAG_CLOSE && n.start_tag_token === i
                          ) &&
                          "TK_CONTENT" !== _.type)),
                      (e =
                        n.is_content_unformatted || n.is_unformatted
                          ? !1
                          : e) && t.print_newline(!1))
                    : ((n.indent_content = !n.custom_beautifier_name),
                      "<" === n.tag_start_char &&
                        ("html" === n.tag_name
                          ? (n.indent_content = this._options.indent_inner_html)
                          : "head" === n.tag_name
                          ? (n.indent_content =
                              this._options.indent_head_inner_html)
                          : "body" === n.tag_name &&
                            (n.indent_content =
                              this._options.indent_body_inner_html)),
                      n.is_inline_element ||
                        n.is_unformatted ||
                        ("TK_CONTENT" === _.type &&
                          !n.is_content_unformatted) ||
                        t.print_newline(!1),
                      this._calcluate_parent_multiline(t, n));
              }),
              (g.prototype._calcluate_parent_multiline = function (t, e) {
                !e.parent ||
                  !t._output.just_added_newline() ||
                  ((e.is_inline_element || e.is_unformatted) &&
                    e.parent.is_inline_element) ||
                  (e.parent.multiline_content = !0);
              }),
              [
                "address",
                "article",
                "aside",
                "blockquote",
                "details",
                "div",
                "dl",
                "fieldset",
                "figcaption",
                "figure",
                "footer",
                "form",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "header",
                "hr",
                "main",
                "nav",
                "ol",
                "p",
                "pre",
                "section",
                "table",
                "ul",
              ]),
            m = ["a", "audio", "del", "ins", "map", "noscript", "video"];
          (g.prototype._do_optional_end_element = function (t) {
            var e,
              n = null;
            if (!t.is_empty_element && t.is_start_tag && t.parent)
              return (
                "body" === t.tag_name
                  ? (n = n || this._tag_stack.try_pop("head"))
                  : "li" === t.tag_name
                  ? (n = n || this._tag_stack.try_pop("li", ["ol", "ul"]))
                  : "dd" === t.tag_name || "dt" === t.tag_name
                  ? (n =
                      (n = n || this._tag_stack.try_pop("dt", ["dl"])) ||
                      this._tag_stack.try_pop("dd", ["dl"]))
                  : "p" === t.parent.tag_name && -1 !== o.indexOf(t.tag_name)
                  ? ((e = t.parent.parent) && -1 !== m.indexOf(e.tag_name)) ||
                    (n = n || this._tag_stack.try_pop("p"))
                  : "rp" === t.tag_name || "rt" === t.tag_name
                  ? (n =
                      (n =
                        n || this._tag_stack.try_pop("rt", ["ruby", "rtc"])) ||
                      this._tag_stack.try_pop("rp", ["ruby", "rtc"]))
                  : "optgroup" === t.tag_name
                  ? (n = n || this._tag_stack.try_pop("optgroup", ["select"]))
                  : "option" === t.tag_name
                  ? (n =
                      n ||
                      this._tag_stack.try_pop("option", [
                        "select",
                        "datalist",
                        "optgroup",
                      ]))
                  : "colgroup" === t.tag_name
                  ? (n = n || this._tag_stack.try_pop("caption", ["table"]))
                  : "thead" === t.tag_name
                  ? (n =
                      (n =
                        n || this._tag_stack.try_pop("caption", ["table"])) ||
                      this._tag_stack.try_pop("colgroup", ["table"]))
                  : "tbody" === t.tag_name || "tfoot" === t.tag_name
                  ? (n =
                      (n =
                        (n =
                          (n =
                            n ||
                            this._tag_stack.try_pop("caption", ["table"])) ||
                          this._tag_stack.try_pop("colgroup", ["table"])) ||
                        this._tag_stack.try_pop("thead", ["table"])) ||
                      this._tag_stack.try_pop("tbody", ["table"]))
                  : "tr" === t.tag_name
                  ? (n =
                      (n =
                        (n =
                          n || this._tag_stack.try_pop("caption", ["table"])) ||
                        this._tag_stack.try_pop("colgroup", ["table"])) ||
                      this._tag_stack.try_pop("tr", [
                        "table",
                        "thead",
                        "tbody",
                        "tfoot",
                      ]))
                  : ("th" !== t.tag_name && "td" !== t.tag_name) ||
                    (n =
                      (n =
                        n ||
                        this._tag_stack.try_pop("td", [
                          "table",
                          "thead",
                          "tbody",
                          "tfoot",
                          "tr",
                        ])) ||
                      this._tag_stack.try_pop("th", [
                        "table",
                        "thead",
                        "tbody",
                        "tfoot",
                        "tr",
                      ])),
                (t.parent = this._tag_stack.get_parser_token()),
                n
              );
          }),
            (t.exports.Beautifier = g);
        },
        function (t, e, n) {
          var i = n(6).Options;
          function _(t) {
            i.call(this, t, "html"),
              1 === this.templating.length &&
                "auto" === this.templating[0] &&
                (this.templating = ["django", "erb", "handlebars", "php"]),
              (this.indent_inner_html = this._get_boolean("indent_inner_html")),
              (this.indent_body_inner_html = this._get_boolean(
                "indent_body_inner_html",
                !0
              )),
              (this.indent_head_inner_html = this._get_boolean(
                "indent_head_inner_html",
                !0
              )),
              (this.indent_handlebars = this._get_boolean(
                "indent_handlebars",
                !0
              )),
              (this.wrap_attributes = this._get_selection("wrap_attributes", [
                "auto",
                "force",
                "force-aligned",
                "force-expand-multiline",
                "aligned-multiple",
                "preserve",
                "preserve-aligned",
              ])),
              (this.wrap_attributes_indent_size = this._get_number(
                "wrap_attributes_indent_size",
                this.indent_size
              )),
              (this.extra_liners = this._get_array("extra_liners", [
                "head",
                "body",
                "/html",
              ])),
              (this.inline = this._get_array("inline", [
                "a",
                "abbr",
                "area",
                "audio",
                "b",
                "bdi",
                "bdo",
                "br",
                "button",
                "canvas",
                "cite",
                "code",
                "data",
                "datalist",
                "del",
                "dfn",
                "em",
                "embed",
                "i",
                "iframe",
                "img",
                "input",
                "ins",
                "kbd",
                "keygen",
                "label",
                "map",
                "mark",
                "math",
                "meter",
                "noscript",
                "object",
                "output",
                "progress",
                "q",
                "ruby",
                "s",
                "samp",
                "select",
                "small",
                "span",
                "strong",
                "sub",
                "sup",
                "svg",
                "template",
                "textarea",
                "time",
                "u",
                "var",
                "video",
                "wbr",
                "text",
                "acronym",
                "big",
                "strike",
                "tt",
              ])),
              (this.void_elements = this._get_array("void_elements", [
                "area",
                "base",
                "br",
                "col",
                "embed",
                "hr",
                "img",
                "input",
                "keygen",
                "link",
                "menuitem",
                "meta",
                "param",
                "source",
                "track",
                "wbr",
                "!doctype",
                "?xml",
                "basefont",
                "isindex",
              ])),
              (this.unformatted = this._get_array("unformatted", [])),
              (this.content_unformatted = this._get_array(
                "content_unformatted",
                ["pre", "textarea"]
              )),
              (this.unformatted_content_delimiter = this._get_characters(
                "unformatted_content_delimiter"
              )),
              (this.indent_scripts = this._get_selection("indent_scripts", [
                "normal",
                "keep",
                "separate",
              ]));
          }
          (_.prototype = new i()), (t.exports.Options = _);
        },
        function (t, e, n) {
          function i(t, e) {
            _.call(this, t, e), (this._current_tag_name = "");
            var t = new a(this._input).read_options(this._options),
              e = new o(this._input);
            (this.__patterns = {
              word: t.until(/[\n\r\t <]/),
              single_quote: t.until_after(/'/),
              double_quote: t.until_after(/"/),
              attribute: t.until(/[\n\r\t =>]|\/>/),
              element_name: t.until(/[\n\r\t >\/]/),
              handlebars_comment: e.starting_with(/{{!--/).until_after(/--}}/),
              handlebars: e.starting_with(/{{/).until_after(/}}/),
              handlebars_open: e.until(/[\n\r\t }]/),
              handlebars_raw_close: e.until(/}}/),
              comment: e.starting_with(/<!--/).until_after(/-->/),
              cdata: e.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
              conditional_comment: e.starting_with(/<!\[/).until_after(/]>/),
              processing: e.starting_with(/<\?/).until_after(/\?>/),
            }),
              this._options.indent_handlebars &&
                (this.__patterns.word =
                  this.__patterns.word.exclude("handlebars")),
              (this._unformatted_content_delimiter = null),
              this._options.unformatted_content_delimiter &&
                ((t = this._input.get_literal_regexp(
                  this._options.unformatted_content_delimiter
                )),
                (this.__patterns.unformatted_content_delimiter = e
                  .matching(t)
                  .until_after(t)));
          }
          var _ = n(9).Tokenizer,
            s = n(9).TOKEN,
            r = n(13).Directives,
            a = n(14).TemplatablePattern,
            o = n(12).Pattern,
            p = {
              TAG_OPEN: "TK_TAG_OPEN",
              TAG_CLOSE: "TK_TAG_CLOSE",
              ATTRIBUTE: "TK_ATTRIBUTE",
              EQUALS: "TK_EQUALS",
              VALUE: "TK_VALUE",
              COMMENT: "TK_COMMENT",
              TEXT: "TK_TEXT",
              UNKNOWN: "TK_UNKNOWN",
              START: s.START,
              RAW: s.RAW,
              EOF: s.EOF,
            },
            h = new r(/<\!--/, /-->/);
          ((i.prototype = new _())._is_comment = function (t) {
            return !1;
          }),
            (i.prototype._is_opening = function (t) {
              return t.type === p.TAG_OPEN;
            }),
            (i.prototype._is_closing = function (t, e) {
              return (
                t.type === p.TAG_CLOSE &&
                e &&
                (((">" === t.text || "/>" === t.text) && "<" === e.text[0]) ||
                  ("}}" === t.text && "{" === e.text[0] && "{" === e.text[1]))
              );
            }),
            (i.prototype._reset = function () {
              this._current_tag_name = "";
            }),
            (i.prototype._get_next_token = function (t, e) {
              this._readWhitespace();
              var n = this._input.peek();
              return null === n
                ? this._create_token(p.EOF, "")
                : this._read_open_handlebars(n, e) ||
                    this._read_attribute(n, t, e) ||
                    this._read_close(n, e) ||
                    this._read_raw_content(n, t, e) ||
                    this._read_content_word(n) ||
                    this._read_comment_or_cdata(n) ||
                    this._read_processing(n) ||
                    this._read_open(n, e) ||
                    this._create_token(p.UNKNOWN, this._input.next());
            }),
            (i.prototype._read_comment_or_cdata = function (t) {
              var e = null,
                n = null,
                i = null;
              return (
                "<" === t &&
                  ("!" === this._input.peek(1) &&
                    ((n = this.__patterns.comment.read())
                      ? (i = h.get_directives(n)) &&
                        "start" === i.ignore &&
                        (n += h.readIgnored(this._input))
                      : (n = this.__patterns.cdata.read())),
                  n && ((e = this._create_token(p.COMMENT, n)).directives = i)),
                e
              );
            }),
            (i.prototype._read_processing = function (t) {
              var e = null,
                n = null;
              return (
                "<" === t &&
                  (n =
                    "!" !== (t = this._input.peek(1)) && "?" !== t
                      ? n
                      : (n = this.__patterns.conditional_comment.read()) ||
                        this.__patterns.processing.read()) &&
                  ((e = this._create_token(p.COMMENT, n)).directives = null),
                e
              );
            }),
            (i.prototype._read_open = function (t, e) {
              var n = null,
                i = null;
              return (
                e ||
                  ("<" === t &&
                    ((n = this._input.next()),
                    "/" === this._input.peek() && (n += this._input.next()),
                    (n += this.__patterns.element_name.read()),
                    (i = this._create_token(p.TAG_OPEN, n)))),
                i
              );
            }),
            (i.prototype._read_open_handlebars = function (t, e) {
              var n = null,
                i = null;
              return (
                e ||
                  (this._options.indent_handlebars &&
                    "{" === t &&
                    "{" === this._input.peek(1) &&
                    (i =
                      "!" === this._input.peek(2)
                        ? ((n =
                            (n = this.__patterns.handlebars_comment.read()) ||
                            this.__patterns.handlebars.read()),
                          this._create_token(p.COMMENT, n))
                        : ((n = this.__patterns.handlebars_open.read()),
                          this._create_token(p.TAG_OPEN, n)))),
                i
              );
            }),
            (i.prototype._read_close = function (t, e) {
              var n = null,
                i = null;
              return (
                e &&
                  ("<" === e.text[0] &&
                  (">" === t || ("/" === t && ">" === this._input.peek(1)))
                    ? ((n = this._input.next()),
                      "/" === t && (n += this._input.next()),
                      (i = this._create_token(p.TAG_CLOSE, n)))
                    : "{" === e.text[0] &&
                      "}" === t &&
                      "}" === this._input.peek(1) &&
                      (this._input.next(),
                      this._input.next(),
                      (i = this._create_token(p.TAG_CLOSE, "}}")))),
                i
              );
            }),
            (i.prototype._read_attribute = function (t, e, n) {
              var i = null;
              return (
                n &&
                  "<" === n.text[0] &&
                  ("=" === t
                    ? (i = this._create_token(p.EQUALS, this._input.next()))
                    : '"' === t || "'" === t
                    ? ((n = this._input.next()),
                      (n += (
                        '"' === t
                          ? this.__patterns.double_quote
                          : this.__patterns.single_quote
                      ).read()),
                      (i = this._create_token(p.VALUE, n)))
                    : (t = this.__patterns.attribute.read()) &&
                      (i =
                        e.type === p.EQUALS
                          ? this._create_token(p.VALUE, t)
                          : this._create_token(p.ATTRIBUTE, t))),
                i
              );
            }),
            (i.prototype._is_content_unformatted = function (t) {
              return (
                -1 === this._options.void_elements.indexOf(t) &&
                (-1 !== this._options.content_unformatted.indexOf(t) ||
                  -1 !== this._options.unformatted.indexOf(t))
              );
            }),
            (i.prototype._read_raw_content = function (t, e, n) {
              var i = "";
              if (n && "{" === n.text[0])
                i = this.__patterns.handlebars_raw_close.read();
              else if (
                e.type === p.TAG_CLOSE &&
                "<" === e.opened.text[0] &&
                "/" !== e.text[0]
              ) {
                n = e.opened.text.substr(1).toLowerCase();
                if ("script" === n || "style" === n) {
                  e = this._read_comment_or_cdata(t);
                  if (e) return (e.type = p.TEXT), e;
                  i = this._input.readUntil(
                    new RegExp("</" + n + "[\\n\\r\\t ]*?>", "ig")
                  );
                } else
                  this._is_content_unformatted(n) &&
                    (i = this._input.readUntil(
                      new RegExp("</" + n + "[\\n\\r\\t ]*?>", "ig")
                    ));
              }
              return i ? this._create_token(p.TEXT, i) : null;
            }),
            (i.prototype._read_content_word = function (t) {
              var e = "";
              if (
                (e =
                  (e =
                    this._options.unformatted_content_delimiter &&
                    t === this._options.unformatted_content_delimiter[0]
                      ? this.__patterns.unformatted_content_delimiter.read()
                      : e) || this.__patterns.word.read())
              )
                return this._create_token(p.TEXT, e);
            }),
            (t.exports.Tokenizer = i),
            (t.exports.TOKEN = p);
        },
      ],
      _ = {};
    var t = (function t(e) {
      var n = _[e];
      if (void 0 !== n) return n.exports;
      n = _[e] = { exports: {} };
      return i[e](n, n.exports, t), n.exports;
    })(18);
    e = t;
  })();
  var e,
    n,
    i,
    _ = e;
  "function" == typeof define && define.amd
    ? define(["require", "./beautify", "./beautify-css"], function (t) {
        var n = t("./beautify"),
          i = t("./beautify-css");
        return {
          html_beautify: function (t, e) {
            return _(t, e, n.js_beautify, i.css_beautify);
          },
        };
      })
    : "undefined" != typeof exports
    ? ((n = require("./beautify.js")),
      (i = require("./beautify-css.js")),
      (exports.html_beautify = function (t, e) {
        return _(t, e, n.js_beautify, i.css_beautify);
      }))
    : "undefined" != typeof window
    ? (window.html_beautify = function (t, e) {
        return _(t, e, window.js_beautify, window.css_beautify);
      })
    : "undefined" != typeof global &&
      (global.html_beautify = function (t, e) {
        return _(t, e, global.js_beautify, global.css_beautify);
      });
})();
