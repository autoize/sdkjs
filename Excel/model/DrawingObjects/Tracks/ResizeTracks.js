/**
 * Created with JetBrains WebStorm.
 * User: Sergey.Luzyanin
 * Date: 6/27/13
 * Time: 4:35 PM
 * To change this template use File | Settings | File Templates.
 */
var TRANSLATE_HANDLE_NO_FLIP = [];
TRANSLATE_HANDLE_NO_FLIP[0] = 0;
TRANSLATE_HANDLE_NO_FLIP[1] = 1;
TRANSLATE_HANDLE_NO_FLIP[2] = 2;
TRANSLATE_HANDLE_NO_FLIP[3] = 3;
TRANSLATE_HANDLE_NO_FLIP[4] = 4;
TRANSLATE_HANDLE_NO_FLIP[5] = 5;
TRANSLATE_HANDLE_NO_FLIP[6] = 6;
TRANSLATE_HANDLE_NO_FLIP[7] = 7;

var TRANSLATE_HANDLE_FLIP_H = [];
TRANSLATE_HANDLE_FLIP_H[0] = 2;
TRANSLATE_HANDLE_FLIP_H[1] = 1;
TRANSLATE_HANDLE_FLIP_H[2] = 0;
TRANSLATE_HANDLE_FLIP_H[3] = 7;
TRANSLATE_HANDLE_FLIP_H[4] = 6;
TRANSLATE_HANDLE_FLIP_H[5] = 5;
TRANSLATE_HANDLE_FLIP_H[6] = 4;
TRANSLATE_HANDLE_FLIP_H[7] = 3;

var TRANSLATE_HANDLE_FLIP_V = [];
TRANSLATE_HANDLE_FLIP_V[0] = 6;
TRANSLATE_HANDLE_FLIP_V[1] = 5;
TRANSLATE_HANDLE_FLIP_V[2] = 4;
TRANSLATE_HANDLE_FLIP_V[3] = 3;
TRANSLATE_HANDLE_FLIP_V[4] = 2;
TRANSLATE_HANDLE_FLIP_V[5] = 1;
TRANSLATE_HANDLE_FLIP_V[6] = 0;
TRANSLATE_HANDLE_FLIP_V[7] = 7;

var TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V = [];
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[0] = 4;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[1] = 5;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[2] = 6;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[3] = 7;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[4] = 0;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[5] = 1;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[6] = 2;
TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[7] = 3;


var SHAPE_ASPECTS = {};
SHAPE_ASPECTS["can"] = 3616635/4810125;
SHAPE_ASPECTS["moon"] = 0.5;
SHAPE_ASPECTS["leftBracket"] = 0.08;
SHAPE_ASPECTS["rightBracket"] = 0.08;
SHAPE_ASPECTS["leftBrace"] = 0.17;
SHAPE_ASPECTS["rightBrace"] = 0.17;
//TODO:

var MIN_SHAPE_SIZE = 1.27;//размер меньше которого нельзя уменшить автофигуру или картинку по горизонтали или вертикали
var MIN_SHAPE_SIZE_DIV2 = MIN_SHAPE_SIZE/2.0;
var MIN_ANGLE = 0.07;


function ResizeTrackShapeImage(originalObject, cardDirection)
{
    this.originalObject = originalObject;
    this.numberHandle = originalObject.getNumByCardDirection(cardDirection);

    var numberHandle = this.numberHandle;
    this.flipH = originalObject.flipH;
    this.flipV = originalObject.flipV;
    var _flip_h = originalObject.flipH;
    var _flip_v = originalObject.flipV;
    var _half_height = originalObject.extY*0.5;
    var _half_width = originalObject.extX*0.5;

    var _sin = Math.sin(originalObject.rot);
    var _cos = Math.cos(originalObject.rot);

    var _translated_num_handle;

    if(!_flip_h && !_flip_v)
    {
        _translated_num_handle = numberHandle;
    }
    else if(_flip_h && !_flip_v)
    {
        _translated_num_handle = TRANSLATE_HANDLE_FLIP_H[numberHandle];
    }
    else if(!_flip_h && _flip_v)
    {
        _translated_num_handle = TRANSLATE_HANDLE_FLIP_V[numberHandle];
    }
    else
    {
        _translated_num_handle = TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[numberHandle];
    }

    this.bAspect = numberHandle % 2 === 0;
    this.aspect = this.bAspect === true ? this.originalObject.getAspect(_translated_num_handle) : 0;

    this.sin = _sin;
    this.cos = _cos;
    this.translatetNumberHandle = _translated_num_handle;

    switch (_translated_num_handle)
    {
        case 0:
        case 1:
        {
            this.fixedPointX = (_half_width*_cos - _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (_half_width*_sin + _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
        case 2:
        case 3:
        {
            this.fixedPointX = (-_half_width*_cos - _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (-_half_width*_sin + _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
        case 4:
        case 5:
        {
            this.fixedPointX = (-_half_width*_cos + _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (-_half_width*_sin - _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
        case 6:
        case 7:
        {
            this.fixedPointX = (_half_width*_cos + _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (_half_width*_sin - _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
    }

    this.mod = this.translatetNumberHandle % 4;
    this.centerPointX = originalObject.x + _half_width;
    this.centerPointY = originalObject.y + _half_height;

    //this.lineFlag = originalObject.checkLine();

    this.originalExtX = originalObject.extX;
    this.originalExtY = originalObject.extY;
    this.originalFlipH = _flip_h;
    this.originalFlipV = _flip_v;

    this.usedExtX =  this.originalExtX === 0 ? (/*this.lineFlag ? this.originalExtX :*/ 0.01) : this.originalExtX;
    this.usedExtY =  this.originalExtY === 0 ? (/*this.lineFlag ? this.originalExtY :*/ 0.01) : this.originalExtY;

    this.resizedExtX = this.originalExtX;
    this.resizedExtY = this.originalExtY;
    this.resizedflipH = _flip_h;
    this.resizedflipV = _flip_v;
    this.resizedPosX = originalObject.x;
    this.resizedPosY = originalObject.y;
    this.resizedRot = originalObject.rot;

    this.transform = originalObject.transform.CreateDublicate();
    this.geometry = originalObject.spPr.geometry.createDuplicate();
    this.brush = originalObject.brush;
    this.pen = originalObject.pen;

    this.bChangeCoef = this.translatetNumberHandle % 2 === 0 && this.originalFlipH !== this.originalFlipV;

    this.overlayObject = new OverlayObject(this.geometry, this.resizedExtX, this.resizedExtY, this.brush, this.pen, this.transform);


    this.track = function(kd1, kd2, e)
    {
        if(!e.ctrlKey)
            this.resize(kd1, kd2, e.shiftKey);
        else
            this.resizeRelativeCenter(kd1, kd2, e.shiftKey)
    };

    this.resize = function(kd1, kd2, shiftKey)
    {
        var _cos = this.cos;
        var _sin = this.sin;

        var _real_height, _real_width;
        var _abs_height, _abs_width;
        var _new_resize_half_width;
        var _new_resize_half_height;
        var _new_used_half_width;
        var _new_used_half_height;
        var _temp;

        if(shiftKey === true && this.bAspect === true)
        {
            var _new_aspect = this.aspect*(Math.abs(kd1/ kd2));

            if (_new_aspect >= this.aspect)
                kd2 = Math.abs(kd1)*(kd2 >= 0 ? 1 : -1 );
            else
                kd1 = Math.abs(kd2)*(kd1 >= 0 ? 1 : -1);
        }

        if(this.bChangeCoef)
        {
            _temp = kd1;
            kd1 = kd2;
            kd2 = _temp;
        }
        switch (this.translatetNumberHandle)
        {
            case 0:
            case 1:
            {
                if(this.translatetNumberHandle === 0)
                {
                    _real_width = this.usedExtX*kd1;
                    _abs_width = Math.abs(_real_width);
                    this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                    if(_real_width < 0)
                        this.resizedflipH = !this.originalFlipH;
                    else
                        this.resizedflipH = this.originalFlipH;
                }
                if(this.translatetNumberHandle === 1)
                {
                    _temp = kd1;
                    kd1 = kd2;
                    kd2 = _temp;
                }

                _real_height = this.usedExtY*kd2;
                _abs_height = Math.abs(_real_height);
                this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                if(_real_height < 0)
                    this.resizedflipV = !this.originalFlipV;
                else
                    this.resizedflipV = this.originalFlipV;


                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }
                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (-_new_used_half_width*_cos + _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (-_new_used_half_width*_sin - _new_used_half_height*_cos) - _new_resize_half_height;
                break;
            }
            case 2:
            case 3:
            {
                if(this.translatetNumberHandle === 2)
                {
                    _temp = kd2;
                    kd2 = kd1;
                    kd1 = _temp;
                    _real_height = this.usedExtY*kd2;
                    _abs_height = Math.abs(_real_height);
                    this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                    if(_real_height < 0)
                        this.resizedflipV = !this.originalFlipV;
                    else
                        this.resizedflipV = this.originalFlipV;
                }

                _real_width = this.usedExtX*kd1;
                _abs_width = Math.abs(_real_width);
                this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                if(_real_width < 0)
                    this.resizedflipH = !this.originalFlipH;
                else
                    this.resizedflipH = this.originalFlipH;


                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }

                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (_new_used_half_width*_cos + _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (_new_used_half_width*_sin - _new_used_half_height*_cos) - _new_resize_half_height;
                break;
            }

            case 4:
            case 5:
            {
                if(this.translatetNumberHandle === 4)
                {
                    _real_width = this.usedExtX*kd1;
                    _abs_width = Math.abs(_real_width);
                    this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                    if(_real_width < 0)
                        this.resizedflipH = !this.originalFlipH;
                    else
                        this.resizedflipH = this.originalFlipH;
                }
                else
                {
                    _temp = kd2;
                    kd2 = kd1;
                    kd1 = _temp;
                }

                _real_height = this.usedExtY*kd2;
                _abs_height = Math.abs(_real_height);
                this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                if(_real_height < 0)
                    this.resizedflipV = !this.originalFlipV;
                else
                    this.resizedflipV = this.originalFlipV;

                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }
                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (_new_used_half_width*_cos - _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (_new_used_half_width*_sin + _new_used_half_height*_cos) - _new_resize_half_height;

                break;
            }

            case 6:
            case 7:
            {
                if(this.translatetNumberHandle === 6)
                {
                    _real_height = this.usedExtY*kd1;
                    _abs_height = Math.abs(_real_height);
                    this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                    if(_real_height < 0)
                        this.resizedflipV = !this.originalFlipV;
                    else
                        this.resizedflipV = this.originalFlipV;
                }
                else
                {
                    _temp = kd2;
                    kd2 = kd1;
                    kd1 = _temp;
                }

                _real_width = this.usedExtX*kd2;
                _abs_width = Math.abs(_real_width);
                this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                if(_real_width < 0)
                    this.resizedflipH = !this.originalFlipH;
                else
                    this.resizedflipH = this.originalFlipH;

                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }
                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (-_new_used_half_width*_cos - _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (-_new_used_half_width*_sin + _new_used_half_height*_cos) - _new_resize_half_height;
                break;
            }
        }

        this.geometry.Recalculate(this.resizedExtX, this.resizedExtY);
        this.overlayObject.updateExtents(this.resizedExtX, this.resizedExtY);

        var _transform = this.transform;
        _transform.Reset();

        var _horizontal_center = this.resizedExtX*0.5;
        var _vertical_center = this.resizedExtY*0.5;
        global_MatrixTransformer.TranslateAppend(_transform, -_horizontal_center, -_vertical_center);

        if(this.resizedflipH)
        {
            global_MatrixTransformer.ScaleAppend(_transform, -1, 1);
        }
        if(this.resizedflipV)
        {
            global_MatrixTransformer.ScaleAppend(_transform, 1, -1);
        }

        global_MatrixTransformer.RotateRadAppend(_transform, -this.resizedRot);


        global_MatrixTransformer.TranslateAppend(_transform, this.resizedPosX, this.resizedPosY);
        global_MatrixTransformer.TranslateAppend(_transform, _horizontal_center, _vertical_center);

    };

    this.resizeRelativeCenter = function(kd1, kd2, shiftKey)
    {
        kd1 = 2*kd1 - 1;
        kd2 = 2*kd2 - 1;
        var _real_height, _real_width;
        var _abs_height, _abs_width;

        if(shiftKey === true && this.bAspect === true)
        {
            var _new_aspect = this.aspect*(Math.abs(kd1/ kd2));

            if (_new_aspect >= this.aspect)
                kd2 = Math.abs(kd1)*(kd2 >= 0 ? 1 : -1 );
            else
                kd1 = Math.abs(kd2)*(kd1 >= 0 ? 1 : -1);
        }

        var _temp;
        if(this.bChangeCoef)
        {
            _temp = kd1;
            kd1 = kd2;
            kd2 = _temp;
        }
        if(this.mod === 0 || this.mod === 1)
        {
            if(this.mod === 0)
            {
                _real_width = this.usedExtX*kd1;
                _abs_width = Math.abs(_real_width);
                this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                this.resizedflipH  = _real_width < 0 ? !this.originalFlipH : this.originalFlipH;

            }
            else
            {
                _temp = kd1;
                kd1 = kd2;
                kd2 = _temp;
            }

            _real_height = this.usedExtY*kd2;
            _abs_height = Math.abs(_real_height);
            this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
            this.resizedflipV  = _real_height < 0 ? !this.originalFlipV : this.originalFlipV;


        }
        else
        {
            if(this.mod === 2)
            {
                _temp = kd1;
                kd1 = kd2;
                kd2 = _temp;

                _real_height = this.usedExtY*kd2;
                _abs_height = Math.abs(_real_height);
                this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                this.resizedflipV  = _real_height < 0 ? !this.originalFlipV : this.originalFlipV;

            }
            _real_width = this.usedExtX*kd1;
            _abs_width = Math.abs(_real_width);
            this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
            this.resizedflipH  = _real_width < 0 ? !this.originalFlipH : this.originalFlipH;

        }

        this.resizedPosX = this.centerPointX - this.resizedExtX*0.5;
        this.resizedPosY = this.centerPointY - this.resizedExtY*0.5;

        this.geometry.Recalculate(this.resizedExtX, this.resizedExtY);
        this.overlayObject.updateExtents(this.resizedExtX, this.resizedExtY);

        var _transform = this.transform;
        _transform.Reset();

        var _horizontal_center = this.resizedExtX*0.5;
        var _vertical_center = this.resizedExtY*0.5;
        global_MatrixTransformer.TranslateAppend(_transform, -_horizontal_center, -_vertical_center);

        if(this.resizedflipH)
        {
            global_MatrixTransformer.ScaleAppend(_transform, -1, 1);
        }
        if(this.resizedflipV)
        {
            global_MatrixTransformer.ScaleAppend(_transform, 1, -1);
        }

        global_MatrixTransformer.RotateRadAppend(_transform, -this.resizedRot);


        global_MatrixTransformer.TranslateAppend(_transform, this.resizedPosX, this.resizedPosY);
        global_MatrixTransformer.TranslateAppend(_transform, _horizontal_center, _vertical_center);

    };

    this.draw = function(overlay)
    {
        this.overlayObject.draw(overlay);
    };

    this.getBounds = function()
    {
        var bounds_checker = new  CSlideBoundsChecker();
        bounds_checker.init(Page_Width, Page_Height, Page_Width, Page_Height);
        this.draw(bounds_checker);
        return {l: bounds_checker.Bounds.min_x, t: bounds_checker.Bounds.min_y, r: bounds_checker.Bounds.max_x , b: bounds_checker.Bounds.max_y};
    };

    this.getBoundsRect = function()
    {
        var t = this.transform;
        var max_x, min_x, max_y, min_y;
        min_x = t.TransformPointX(0, 0);
        max_x = min_x;
        min_y = t.TransformPointY(0, 0);
        max_y = min_y;
        var arr = [{x: this.resizedExtX, y: 0}, {x: this.resizedExtX, y: this.resizedExtY}, {x: 0, y: this.resizedExtY}];
        var t_x, t_y;
        for(var i = 0; i < arr.length; ++i)
        {
            var p = arr[i];
            t_x = t.TransformPointX(p.x, p.y);
            t_y = t.TransformPointY(p.x, p.y);
            if(t_x < min_x)
                min_x = t_x;
            if(t_x > max_x)
                max_x = t_x;
            if(t_y < min_y)
                min_y = t_y;
            if(t_y > max_y)
                max_y = t_y;
        }
        return {l: min_x, t: min_y, r: max_x, b: max_y};
    };

    this.trackEnd = function()
    {
        this.originalObject.setPosition(this.resizedPosX, this.resizedPosY);
        this.originalObject.setExtents(this.resizedExtX, this.resizedExtY);
        this.originalObject.setFlips(this.resizedflipH, this.resizedflipV);
        this.originalObject.recalculateTransform();
        this.originalObject.updateDrawingBaseCoordinates();
    };
}

function ResizeTrackShapeImageInGroup(originalObject, cardDirection)
{
    this.originalObject = originalObject;
    this.numberHandle = originalObject.getNumByCardDirection(cardDirection);

    var numberHandle = this.numberHandle;
    this.flipH = originalObject.flipH;
    this.flipV = originalObject.flipV;
    var _flip_h = originalObject.flipH;
    var _flip_v = originalObject.flipV;
    var _half_height = originalObject.extY*0.5;
    var _half_width = originalObject.extX*0.5;

    var _sin = Math.sin(originalObject.rot);
    var _cos = Math.cos(originalObject.rot);

    var _translated_num_handle;

    if(!_flip_h && !_flip_v)
    {
        _translated_num_handle = numberHandle;
    }
    else if(_flip_h && !_flip_v)
    {
        _translated_num_handle = TRANSLATE_HANDLE_FLIP_H[numberHandle];
    }
    else if(!_flip_h && _flip_v)
    {
        _translated_num_handle = TRANSLATE_HANDLE_FLIP_V[numberHandle];
    }
    else
    {
        _translated_num_handle = TRANSLATE_HANDLE_FLIP_H_AND_FLIP_V[numberHandle];
    }

    this.bAspect = numberHandle % 2 === 0;
    this.aspect = this.bAspect === true ? this.originalObject.getAspect(_translated_num_handle) : 0;

    this.sin = _sin;
    this.cos = _cos;
    this.translatetNumberHandle = _translated_num_handle;

    switch (_translated_num_handle)
    {
        case 0:
        case 1:
        {
            this.fixedPointX = (_half_width*_cos - _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (_half_width*_sin + _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
        case 2:
        case 3:
        {
            this.fixedPointX = (-_half_width*_cos - _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (-_half_width*_sin + _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
        case 4:
        case 5:
        {
            this.fixedPointX = (-_half_width*_cos + _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (-_half_width*_sin - _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
        case 6:
        case 7:
        {
            this.fixedPointX = (_half_width*_cos + _half_height*_sin) + _half_width + originalObject.x;
            this.fixedPointY = (_half_width*_sin - _half_height*_cos) + _half_height + originalObject.y;
            break;
        }
    }

    this.mod = this.translatetNumberHandle % 4;
    this.centerPointX = originalObject.x + _half_width;
    this.centerPointY = originalObject.y + _half_height;

    //this.lineFlag = originalObject.checkLine();

    this.originalExtX = originalObject.extX;
    this.originalExtY = originalObject.extY;
    this.originalFlipH = _flip_h;
    this.originalFlipV = _flip_v;

    this.usedExtX =  this.originalExtX === 0 ? (/*this.lineFlag ? this.originalExtX :*/ 0.01) : this.originalExtX;
    this.usedExtY =  this.originalExtY === 0 ? (/*this.lineFlag ? this.originalExtY :*/ 0.01) : this.originalExtY;

    this.resizedExtX = this.originalExtX;
    this.resizedExtY = this.originalExtY;
    this.resizedflipH = _flip_h;
    this.resizedflipV = _flip_v;
    this.resizedPosX = originalObject.x;
    this.resizedPosY = originalObject.y;
    this.resizedRot = originalObject.rot;

    this.transform = originalObject.transform.CreateDublicate();
    this.geometry = originalObject.spPr.geometry.createDuplicate();
    this.brush = originalObject.brush;
    this.pen = originalObject.pen;

    this.bChangeCoef = this.translatetNumberHandle % 2 === 0 && this.originalFlipH !== this.originalFlipV;

    this.overlayObject = new OverlayObject(this.geometry, this.resizedExtX, this.resizedExtY, this.brush, this.pen, this.transform);


    this.track = function(kd1, kd2, e)
    {
        if(!e.ctrlKey)
            this.resize(kd1, kd2, e.shiftKey);
        else
            this.resizeRelativeCenter(kd1, kd2, e.shiftKey)
    };

    this.resize = function(kd1, kd2, shiftKey)
    {
        var _cos = this.cos;
        var _sin = this.sin;

        var _real_height, _real_width;
        var _abs_height, _abs_width;
        var _new_resize_half_width;
        var _new_resize_half_height;
        var _new_used_half_width;
        var _new_used_half_height;
        var _temp;

        if(shiftKey === true && this.bAspect === true)
        {
            var _new_aspect = this.aspect*(Math.abs(kd1/ kd2));

            if (_new_aspect >= this.aspect)
                kd2 = Math.abs(kd1)*(kd2 >= 0 ? 1 : -1 );
            else
                kd1 = Math.abs(kd2)*(kd1 >= 0 ? 1 : -1);
        }

        if(this.bChangeCoef)
        {
            _temp = kd1;
            kd1 = kd2;
            kd2 = _temp;
        }
        switch (this.translatetNumberHandle)
        {
            case 0:
            case 1:
            {
                if(this.translatetNumberHandle === 0)
                {
                    _real_width = this.usedExtX*kd1;
                    _abs_width = Math.abs(_real_width);
                    this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                    if(_real_width < 0)
                        this.resizedflipH = !this.originalFlipH;
                    else
                        this.resizedflipH = this.originalFlipH;
                }
                if(this.translatetNumberHandle === 1)
                {
                    _temp = kd1;
                    kd1 = kd2;
                    kd2 = _temp;
                }

                _real_height = this.usedExtY*kd2;
                _abs_height = Math.abs(_real_height);
                this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                if(_real_height < 0)
                    this.resizedflipV = !this.originalFlipV;
                else
                    this.resizedflipV = this.originalFlipV;


                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }
                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (-_new_used_half_width*_cos + _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (-_new_used_half_width*_sin - _new_used_half_height*_cos) - _new_resize_half_height;
                break;
            }
            case 2:
            case 3:
            {
                if(this.translatetNumberHandle === 2)
                {
                    _temp = kd2;
                    kd2 = kd1;
                    kd1 = _temp;
                    _real_height = this.usedExtY*kd2;
                    _abs_height = Math.abs(_real_height);
                    this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                    if(_real_height < 0)
                        this.resizedflipV = !this.originalFlipV;
                    else
                        this.resizedflipV = this.originalFlipV;
                }

                _real_width = this.usedExtX*kd1;
                _abs_width = Math.abs(_real_width);
                this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                if(_real_width < 0)
                    this.resizedflipH = !this.originalFlipH;
                else
                    this.resizedflipH = this.originalFlipH;


                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }

                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (_new_used_half_width*_cos + _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (_new_used_half_width*_sin - _new_used_half_height*_cos) - _new_resize_half_height;
                break;
            }

            case 4:
            case 5:
            {
                if(this.translatetNumberHandle === 4)
                {
                    _real_width = this.usedExtX*kd1;
                    _abs_width = Math.abs(_real_width);
                    this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                    if(_real_width < 0)
                        this.resizedflipH = !this.originalFlipH;
                    else
                        this.resizedflipH = this.originalFlipH;
                }
                else
                {
                    _temp = kd2;
                    kd2 = kd1;
                    kd1 = _temp;
                }

                _real_height = this.usedExtY*kd2;
                _abs_height = Math.abs(_real_height);
                this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                if(_real_height < 0)
                    this.resizedflipV = !this.originalFlipV;
                else
                    this.resizedflipV = this.originalFlipV;

                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }
                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (_new_used_half_width*_cos - _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (_new_used_half_width*_sin + _new_used_half_height*_cos) - _new_resize_half_height;

                break;
            }

            case 6:
            case 7:
            {
                if(this.translatetNumberHandle === 6)
                {
                    _real_height = this.usedExtY*kd1;
                    _abs_height = Math.abs(_real_height);
                    this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                    if(_real_height < 0)
                        this.resizedflipV = !this.originalFlipV;
                    else
                        this.resizedflipV = this.originalFlipV;
                }
                else
                {
                    _temp = kd2;
                    kd2 = kd1;
                    kd1 = _temp;
                }

                _real_width = this.usedExtX*kd2;
                _abs_width = Math.abs(_real_width);
                this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                if(_real_width < 0)
                    this.resizedflipH = !this.originalFlipH;
                else
                    this.resizedflipH = this.originalFlipH;

                _new_resize_half_width = this.resizedExtX*0.5;
                _new_resize_half_height = this.resizedExtY*0.5;
                if(this.resizedflipH !== this.originalFlipH)
                {
                    _new_used_half_width = -_new_resize_half_width;
                }
                else
                {
                    _new_used_half_width = _new_resize_half_width;
                }

                if(this.resizedflipV !== this.originalFlipV)
                {
                    _new_used_half_height = -_new_resize_half_height;
                }
                else
                {
                    _new_used_half_height = _new_resize_half_height;
                }

                this.resizedPosX = this.fixedPointX + (-_new_used_half_width*_cos - _new_used_half_height*_sin) - _new_resize_half_width;
                this.resizedPosY = this.fixedPointY + (-_new_used_half_width*_sin + _new_used_half_height*_cos) - _new_resize_half_height;
                break;
            }
        }

        this.geometry.Recalculate(this.resizedExtX, this.resizedExtY);
        this.overlayObject.updateExtents(this.resizedExtX, this.resizedExtY);

        var _transform = this.transform;
        _transform.Reset();

        var _horizontal_center = this.resizedExtX*0.5;
        var _vertical_center = this.resizedExtY*0.5;
        global_MatrixTransformer.TranslateAppend(_transform, -_horizontal_center, -_vertical_center);

        if(this.resizedflipH)
        {
            global_MatrixTransformer.ScaleAppend(_transform, -1, 1);
        }
        if(this.resizedflipV)
        {
            global_MatrixTransformer.ScaleAppend(_transform, 1, -1);
        }

        global_MatrixTransformer.RotateRadAppend(_transform, -this.resizedRot);


        global_MatrixTransformer.TranslateAppend(_transform, this.resizedPosX, this.resizedPosY);
        global_MatrixTransformer.TranslateAppend(_transform, _horizontal_center, _vertical_center);

    };

    this.resizeRelativeCenter = function(kd1, kd2, shiftKey)
    {
        kd1 = 2*kd1 - 1;
        kd2 = 2*kd2 - 1;
        var _real_height, _real_width;
        var _abs_height, _abs_width;

        if(shiftKey === true && this.bAspect === true)
        {
            var _new_aspect = this.aspect*(Math.abs(kd1/ kd2));

            if (_new_aspect >= this.aspect)
                kd2 = Math.abs(kd1)*(kd2 >= 0 ? 1 : -1 );
            else
                kd1 = Math.abs(kd2)*(kd1 >= 0 ? 1 : -1);
        }

        var _temp;
        if(this.bChangeCoef)
        {
            _temp = kd1;
            kd1 = kd2;
            kd2 = _temp;
        }
        if(this.mod === 0 || this.mod === 1)
        {
            if(this.mod === 0)
            {
                _real_width = this.usedExtX*kd1;
                _abs_width = Math.abs(_real_width);
                this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
                this.resizedflipH  = _real_width < 0 ? !this.originalFlipH : this.originalFlipH;

            }
            else
            {
                _temp = kd1;
                kd1 = kd2;
                kd2 = _temp;
            }

            _real_height = this.usedExtY*kd2;
            _abs_height = Math.abs(_real_height);
            this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
            this.resizedflipV  = _real_height < 0 ? !this.originalFlipV : this.originalFlipV;


        }
        else
        {
            if(this.mod === 2)
            {
                _temp = kd1;
                kd1 = kd2;
                kd2 = _temp;

                _real_height = this.usedExtY*kd2;
                _abs_height = Math.abs(_real_height);
                this.resizedExtY = _abs_height >= MIN_SHAPE_SIZE  ? _abs_height : MIN_SHAPE_SIZE;
                this.resizedflipV  = _real_height < 0 ? !this.originalFlipV : this.originalFlipV;

            }
            _real_width = this.usedExtX*kd1;
            _abs_width = Math.abs(_real_width);
            this.resizedExtX = _abs_width >= MIN_SHAPE_SIZE  ? _abs_width : MIN_SHAPE_SIZE;
            this.resizedflipH  = _real_width < 0 ? !this.originalFlipH : this.originalFlipH;

        }

        this.resizedPosX = this.centerPointX - this.resizedExtX*0.5;
        this.resizedPosY = this.centerPointY - this.resizedExtY*0.5;

        this.geometry.Recalculate(this.resizedExtX, this.resizedExtY);
        this.overlayObject.updateExtents(this.resizedExtX, this.resizedExtY);

        var _transform = this.transform;
        _transform.Reset();

        var _horizontal_center = this.resizedExtX*0.5;
        var _vertical_center = this.resizedExtY*0.5;
        global_MatrixTransformer.TranslateAppend(_transform, -_horizontal_center, -_vertical_center);

        if(this.resizedflipH)
        {
            global_MatrixTransformer.ScaleAppend(_transform, -1, 1);
        }
        if(this.resizedflipV)
        {
            global_MatrixTransformer.ScaleAppend(_transform, 1, -1);
        }

        global_MatrixTransformer.RotateRadAppend(_transform, -this.resizedRot);


        global_MatrixTransformer.TranslateAppend(_transform, this.resizedPosX, this.resizedPosY);
        global_MatrixTransformer.TranslateAppend(_transform, _horizontal_center, _vertical_center);

    };

    this.draw = function(overlay)
    {
        this.overlayObject.draw(overlay);
    };

    this.getBounds = function()
    {
        var bounds_checker = new  CSlideBoundsChecker();
        bounds_checker.init(Page_Width, Page_Height, Page_Width, Page_Height);
        this.draw(bounds_checker);
        return {l: bounds_checker.Bounds.min_x, t: bounds_checker.Bounds.min_y, r: bounds_checker.Bounds.max_x , b: bounds_checker.Bounds.max_y};
    };

    this.getBoundsRect = function()
    {
        var t = this.transform;
        var max_x, min_x, max_y, min_y;
        min_x = t.TransformPointX(0, 0);
        max_x = min_x;
        min_y = t.TransformPointY(0, 0);
        max_y = min_y;
        var arr = [{x: this.resizedExtX, y: 0}, {x: this.resizedExtX, y: this.resizedExtY}, {x: 0, y: this.resizedExtY}];
        var t_x, t_y;
        for(var i = 0; i < arr.length; ++i)
        {
            var p = arr[i];
            t_x = t.TransformPointX(p.x, p.y);
            t_y = t.TransformPointY(p.x, p.y);
            if(t_x < min_x)
                min_x = t_x;
            if(t_x > max_x)
                max_x = t_x;
            if(t_y < min_y)
                min_y = t_y;
            if(t_y > max_y)
                max_y = t_y;
        }
        return {l: min_x, t: min_y, r: max_x, b: max_y};
    };

    this.trackEnd = function()
    {
        this.originalObject.setPosition(this.resizedPosX, this.resizedPosY);
        this.originalObject.setExtents(this.resizedExtX, this.resizedExtY);
        this.originalObject.setFlips(this.resizedflipH, this.resizedflipV);
        this.originalObject.recalculateTransform();
        this.originalObject.updateDrawingBaseCoordinates();
    };
}